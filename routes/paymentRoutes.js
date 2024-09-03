var express = require('express');
const { orders, verify } = require('../controllers/paymentController');
const { userAuth } = require('../middlewares/authorization')
var router = express.Router();


router.post('/orders', userAuth, orders);
router.post('/verify', userAuth, verify);

module.exports = router;