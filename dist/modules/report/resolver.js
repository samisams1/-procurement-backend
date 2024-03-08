"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../config/database"));
const model_1 = __importDefault(require("../Payment/model"));
const apollo_server_express_1 = require("apollo-server-express");
const startDate = new Date('2024-02-01');
const endDate = new Date('2024-02-29');
const reportResolver = {
    Query: {
        dailyReport: async (_, { id }) => {
            try {
                const results = await model_1.default.findAll({
                    attributes: [
                        [database_1.default.fn('date_trunc', 'day', database_1.default.col('paidAt')), 'date'],
                        [database_1.default.fn('sum', database_1.default.col('amount')), 'totalAmount'],
                    ],
                    group: [database_1.default.fn('date_trunc', 'day', database_1.default.col('paidAt'))],
                    where: { userId: id },
                });
                const dailyReports = results.map((result) => ({
                    date: result.dataValues.date.toISOString().substring(0, 10),
                    totalAmount: result.dataValues.totalAmount,
                }));
                // console.log(dailyReports);
                return dailyReports;
            }
            catch (error) {
                console.error(error);
                throw new apollo_server_express_1.ApolloError('Failed to retrieve payment', 'INTERNAL_SERVER_ERROR');
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
        monthlyReport: async (_, { id }) => {
            try {
                const results = await model_1.default.findAll({
                    attributes: [
                        [
                            database_1.default.fn('to_char', database_1.default.col('paidAt'), 'YYYY-MM'),
                            'month'
                        ],
                        [database_1.default.fn('sum', database_1.default.col('amount')), 'totalAmount'],
                    ],
                    group: [database_1.default.fn('to_char', database_1.default.col('paidAt'), 'YYYY-MM')],
                    where: { userId: id },
                });
                const monthlyReports = results.map((result) => ({
                    month: result.dataValues.month,
                    totalAmount: result.dataValues.totalAmount,
                }));
                return monthlyReports;
            }
            catch (error) {
                console.error(error);
                throw new apollo_server_express_1.ApolloError('Failed to retrieve payment', 'INTERNAL_SERVER_ERROR');
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
        yearlyReport: async (_, { id }) => {
            try {
                const results = await model_1.default.findAll({
                    attributes: [
                        [database_1.default.fn('date_trunc', 'year', database_1.default.col('paidAt')), 'year'],
                        [database_1.default.fn('sum', database_1.default.col('amount')), 'totalAmount'],
                    ],
                    group: [database_1.default.fn('date_trunc', 'year', database_1.default.col('paidAt'))],
                    where: { userId: id },
                });
                const yearReports = results.map((result) => ({
                    year: result.dataValues.year,
                    totalAmount: result.dataValues.totalAmount,
                }));
                return yearReports;
            }
            catch (error) {
                console.error(error);
                throw new apollo_server_express_1.ApolloError('Failed to retrieve payment', 'INTERNAL_SERVER_ERROR');
            }
        },
    },
};
exports.default = reportResolver;
