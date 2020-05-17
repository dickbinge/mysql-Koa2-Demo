const Sequelize = require('sequelize');
const config = require('../config/dbInfo');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  pool: {   //连接池设置
    max: 5, //最大连接数
    min: 0, //最小连接数
    idle: 10000
  },
});
// 用户信息表
const Account = sequelize.define('account', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
// 顾客信息表
const Customer = sequelize.define('customer', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  enName: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('enName', val.toUpperCase());
    },
  },
  sex: {
    type: Sequelize.ENUM(['男', '女']),
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
  },
  country: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  fullAddress: {
    type: Sequelize.STRING,
    get() {
      return `${this.getDataValue('country')}${this.getDataValue('city')}${this.getDataValue('address')}`;
    },
  },
});

Customer.sync({ force: false });
Account.sync({ force: false });
module.exports = {
  Account,
  Customer,
};