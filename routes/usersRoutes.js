var express = require('express');
const { userAuth } = require('../middlewares/authorization');
const { getTheatre, getMovies, getSeats, addReviews, getReviews, updateReviews, deleteReviews, getShows } = require('../controllers/userController');
var router = express.Router();


router.get('/theatrelist', userAuth, getTheatre);
router.get('/movielist', userAuth, getMovies);
router.get('/getseats/:id', userAuth, getSeats);
router.get('/getshows',userAuth, getShows);
router.get('/getreviews', userAuth, getReviews);
router.post('/addreviews', userAuth, addReviews);
router.put('/updatereviews', userAuth, updateReviews);
router.delete('/deletereviews', userAuth, deleteReviews);

module.exports = router;
