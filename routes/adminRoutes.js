var express = require('express');
const { addMovie, addshows, addTheatre, addSeats } = require('../controllers/adminController');
const {adminAuth}=require('../middlewares/authorization')
const upload = require('../middlewares/upload-middleware');
var router = express.Router();


router.post('/addmovie',adminAuth, upload, addMovie);
router.post('/addtheatre',adminAuth,addTheatre);
router.post('/addshows',adminAuth,addshows);
router.post('/addmovie',adminAuth,addMovie);
router.post('/addseats',adminAuth,addSeats);

module.exports = router;