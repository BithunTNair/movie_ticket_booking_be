var express = require('express');
const { userAuth } = require('../middlewares/authorization');
const { getTheatre, getMovies, getSeats, addReviews, getReviews } = require('../controllers/userController');
var router = express.Router();


router.get('/theatrelist',userAuth,getTheatre );
router.get('/movielist',userAuth,getMovies );
router.get('/seats',userAuth,getSeats );
router.post('/addreviews',userAuth,addReviews);
router.post('/getreviews',userAuth,getReviews);
module.exports = router;
