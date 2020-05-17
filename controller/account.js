const AccountService = require('../service/account');

module.exports = {
  login: async (ctx, next) => {
    const { username, password } = ctx.request.body;
    const account = AccountService.getAccountByUserName(username);
    if (account) {
      if (password === account.password) {
        ctx.body = {
          status: 0,
          msg: 'success',
          data: account,
        };
      } else {
        ctx.body = {
          status: 1,
          msg: '密码错误！',
        }
      }
    } else {
      ctx.body = {
        status: 1,
        msg: '用户信息不存在！',
      }
    }
  },
  addAccount: async (ctx, next) => {
    const account = ctx.request.body;
    const count = AccountService.getAccountByUserName(account.username);
    ctx.type = 'json';
    if (count > 0) {
      ctx.body = {
        status: 1,
        msg: '当前用户名已存在!',
      };
    } else {
      await AccountService.createAccount(account);
      ctx.type = 'json';
      ctx.body = {
        status: 0,
      };
    }
  },
  updateAccount: async (ctx, next) => {
    const id = ctx.params.id;
    const account = ctx.request.body;
    await AccountService.updateAccount(id, account);
    ctx.type = 'json';
    ctx.body = {
      status: 0,
    };
  },
}