const customerService = require('../service/custom');

module.exports = {
  getAllCustomers: async(ctx, next) => {
    const customers = await customerService.getAllCustomers();
    ctx.type = 'json'; // 通过JSON输出
    ctx.body = {
      status: 0,
      data: customers,
    };
  },
  getCustomerById: async (ctx, next) => {
    const customer = await customerService.getCustomerById(ctx.params.id);
    ctx.type = 'json';
    ctx.body = {
      status: 0,
      data: customer,
    };
  },
  getCustomerByName: async (ctx, next) => {
    const customer = await customerService.getCustomerByName(ctx.params.name);
    ctx.type = 'json';
    ctx.body = {
      status: 0,
      data: customer,
    };
  },
  addCustomer: async ctx => {
    const customer = ctx.request.body;
    await customerService.createCustomer(customer);
    ctx.type = 'json';
    ctx.body = {
      status: 0,
    };
  },
  updateCustomer: async ctx => {
    const id = ctx.params.id;
    const customer = ctx.request.body;
    await customerService.updateCustomer(id, customer);
    ctx.type = 'json';
    ctx.body = {
      status: 0,
    };
  },
  deleteCustomer: async ctx => {
    await customerService.deleteCustomer(ctx.params.id);
    ctx.type = 'json';
    ctx.body = {
      status: 0,
    };
  },
}