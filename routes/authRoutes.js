var express = require('express');
const { signup, signin, ownersignin, ownersignup } = require('../controllers/authController');
var router = express.Router();


router.post('/signup', signup);
router.post('/signin', signin);
router.post('/ownersignin', ownersignin);
router.post('/ownersignup', ownersignup);

module.exports = router;
