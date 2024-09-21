var express = require('express');
const { addshows } = require('../controllers/OwnerController');
const { ownerAuth } = require('../middlewares/authorization');
var router = express.Router();


router.post('/addshowsbyowner',ownerAuth,addshows );


module.exports = router;