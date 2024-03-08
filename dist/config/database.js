"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*import { Sequelize } from 'sequelize';
const sequelize = new Sequelize('nilesoft_etproforma', 'postgres', 'samisams', {
  host: 'localhost',
  dialect: 'postgres',
  schema: 'et_proforma', // Add this line to set the default schema
});
export default sequelize; */
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('nilesoft_etproforma', 'nilesoft', 'samisams@123', {
    host: 'localhost',
    dialect: 'postgres',
    schema: 'et_proforma', // Add this line to set the default schema
});
exports.default = sequelize;
