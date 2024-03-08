import { Op } from 'sequelize';
import sequelize from '../../config/database';
import Payment from '../Payment/model';
import { ApolloError } from 'apollo-server-express';

const startDate = new Date('2024-02-01');
const endDate = new Date('2024-02-29');

const reportResolver = {
  Query: {
    dailyReport: async (_: any, { id }: { id: number }) => {
      try {
        const results = await Payment.findAll({
          attributes: [
            [sequelize.fn('date_trunc', 'day', sequelize.col('paidAt')), 'date'],
            [sequelize.fn('sum', sequelize.col('amount')), 'totalAmount'],
          ],
          group: [sequelize.fn('date_trunc', 'day', sequelize.col('paidAt'))],
          where: {userId:id },
        });

        const dailyReports = results.map((result: any) => ({
          date: result.dataValues.date.toISOString().substring(0, 10),
          totalAmount: result.dataValues.totalAmount,
        }));

       // console.log(dailyReports);
        return dailyReports;

      } catch (error) {
        console.error(error);
        throw new ApolloError('Failed to retrieve payment', 'INTERNAL_SERVER_ERROR');
      }
    },
  /*  monthlyReport: async (parent: any, { id }: { id: number }) => {
      try {
        const results = await Payment.findAll({
          attributes: [
            [sequelize.fn('date_trunc', 'month', sequelize.col('paidAt')), 'month'],
            [sequelize.fn('sum', sequelize.col('amount')), 'totalAmount'],
          ],
          group: [sequelize.fn('date_trunc', 'month', sequelize.col('paidAt'))],
        });
        console.log(results);
        return results;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve payment');
      }
    }, */
    monthlyReport: async (_: any, { id }: { id: number }) => {
      try {
        const results = await Payment.findAll({
          attributes: [
            [
              sequelize.fn(
                'to_char',
                sequelize.col('paidAt'),
                'YYYY-MM'
              ),
              'month'
            ],
            [sequelize.fn('sum', sequelize.col('amount')), 'totalAmount'],
          ],
          group: [sequelize.fn('to_char', sequelize.col('paidAt'), 'YYYY-MM')],
          where: {userId:id },
        });
    
        const monthlyReports = results.map((result: any) => ({
          month: result.dataValues.month,
          totalAmount: result.dataValues.totalAmount,
        }));
    
        return monthlyReports;
      } catch (error) {
        console.error(error);
        throw new ApolloError('Failed to retrieve payment', 'INTERNAL_SERVER_ERROR');
      }
    },
   /* yearlyReport: async (parent: any, { id }: { id: number }) => {
      try {
        const results = await Payment.findAll({
          attributes: [
            [sequelize.fn('date_trunc', 'year', sequelize.col('paidAt')), 'year'],
            [sequelize.fn('sum', sequelize.col('amount')), 'totalAmount'],
          ],
          group: [sequelize.fn('date_trunc', 'year', sequelize.col('paidAt'))],
        });
        console.log(results);
        return results;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve payment');
      }
    }, */
    yearlyReport: async (_: any, { id }: { id: number }) => {
      try {
        const results = await Payment.findAll({
          attributes: [
            [sequelize.fn('date_trunc', 'year', sequelize.col('paidAt')), 'year'],
            [sequelize.fn('sum', sequelize.col('amount')), 'totalAmount'],
          ],
          group: [sequelize.fn('date_trunc', 'year', sequelize.col('paidAt'))],
          where: {userId:id },
        });
    
        const yearReports = results.map((result: any) => ({
          year: result.dataValues.year,
          totalAmount: result.dataValues.totalAmount,
        }));
    
        return yearReports;
      } catch (error) {
        console.error(error);
        throw new ApolloError('Failed to retrieve payment', 'INTERNAL_SERVER_ERROR');
      }
    },
  },
};

export default reportResolver;