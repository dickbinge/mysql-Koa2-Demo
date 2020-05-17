const router = require('koa-router')();
const customController = require('../controller/custom');
const accountController = require('../controller/account');

// router.get('/', homeController.index);
router.get('/', async ctx => {
  ctx.body = '<h2>测试</h2>';
});

// 顾客信息restful
router.get('/customer/list', customController.getAllCustomers);
router.get('/customerById/:id', customController.getCustomerById);
router.get('/customerByName/:name', customController.getCustomerByName);
router.post('/customer', customController.addCustomer);
router.put('/customer/:id', customController.updateCustomer);
router.delete('/customer/:id', customController.deleteCustomer);

// 用户信息restful
router.post('/login', accountController.login);
router.post('/account', accountController.addAccount);
router.put('/account', accountController.updateAccount);
module.exports = router;

