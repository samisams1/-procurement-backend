import { Sequelize } from 'sequelize';
const sequelize = new Sequelize('nilesoft_etproforma', 'postgres', 'samisams', {
  host: 'localhost',
  dialect: 'postgres',
  schema: 'et_proforma', // Add this line to set the default schema
});
export default sequelize; 
/*import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('nilesoft_etproforma', 'nilesoft', 'samisams@123', {
  host: 'localhost',
  dialect: 'postgres',
  schema: 'et_proforma', // Add this line to set the default schema
});

export default sequelize; */