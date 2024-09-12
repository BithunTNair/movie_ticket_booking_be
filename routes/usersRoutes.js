var express = require('express');
const { userAuth } = require('../middlewares/authorization');
const { getTheatre, getMovies, getSeats, getAllShows, getShowsbyDate, getSeatsbyShow, getMoviebyshow } = require('../controllers/userController');
const { getTheatrebyId, getMoviebyId, getShowtimeById } = require('../controllers/additionalController');
const { getReviews, addReviews, updateReviews, deleteReviews } = require('../controllers/reviewController');
var router = express.Router();


router.get('/theatrelist', userAuth, getTheatre);
router.get('/singletheatre', userAuth,getTheatrebyId);
router.get('/movielist', userAuth, getMovies);
router.get('/singlemovie',userAuth, getMoviebyId);
router.get('/displayshowtime', getShowtimeById);
router.get('/getseats/:id', userAuth, getSeats);
router.get('/getseatsbyshow/:id', userAuth, getSeatsbyShow);
router.get('/getmoviebyshow',userAuth,  getMoviebyshow);
router.get('/getshows', userAuth, getAllShows);
router.get('/getshowsbydate', userAuth, getShowsbyDate);
router.get('/getreviews', userAuth, getReviews);
router.post('/addreviews/:id', userAuth, addReviews);
router.put('/updatereviews/:id', userAuth, updateReviews);
router.delete('/deletereviews/:id', userAuth, deleteReviews);

module.exports = router;
