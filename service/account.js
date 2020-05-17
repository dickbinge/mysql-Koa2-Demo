const { Account } = require('../model/custom');

class AccountService {
  async getAccountById(id) {
    return Account.findAll({
      where: {
        id: id,
      },
    });
  };
  async getAccountByUserName(name) {
    return Account.findAll({
      where: {
        username: name,
      },
    });
  };
  async createAccount(account) {
    return Account.create(account);
  };
  async updateAccount(id, account) {
    const item = await getAccountById(id);
    if (item) {
      return item.update(account);
    } else {
      throw new Error('the account with id is not exist!');
    }
  }; 
};
module.exports = new AccountService();