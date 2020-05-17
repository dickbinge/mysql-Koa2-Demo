const { Customer}  = require('../model/custom');
const { Op } = require('sequelize');

class CustomerService{
  async getAllCustomers() {
    return Customer.findAndCountAll({
      attributes:['name', 'sex'], // 当前接口查询返回结果只包含这两列
      order: [
        ['updatedAt', 'DESC'],
      ],
    });
  };
  async getCustomerById(id) {
    return Customer.findAll({
      where: {
        id: id,
      }
    });
  };
  async getCustomerByName(name) {
    return Customer.findAll({
      where: {
        name: {
          [Op.like]: `${name}%`
        }
      }
    });
  };
  async updateCustomer(id, customer) {
    const item = await this.getCustomerById(id);
    if (item.length === 1) {
      return Customer.update(customer, {
        where: {
          id: id,
        }
      });
    } else {
      throw new Error('the customer with id is not exist!');
    }
  };
  
  async createCustomer(customer) {
    return Customer.create(customer);
  };
  
  async deleteCustomer(id) {
    const item = await this.getCustomerById(id);
    if (item.length > 0) {
      return Customer.destroy({
        where: {
          id: id,
        }
      });
    }
  }
};

module.exports = new CustomerService();