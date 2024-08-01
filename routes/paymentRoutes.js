var express = require('express');
const { orders, verify } = require('../controllers/paymentController');
var router = express.Router();


router.post('/orders',orders);
router.post('/verify',verify );

module.exports = router;