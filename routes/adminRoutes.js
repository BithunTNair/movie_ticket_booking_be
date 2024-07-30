var express = require('express');
const { addMovie } = require('../controllers/adminController');
const upload = require('../middlewares/upload-middleware');
var router = express.Router();


router.post('/addmovie', upload, addMovie);

module.exports = router;