var express = require('express');
const { userAuth } = require('../middlewares/authorization');
const { getTheatre, getMovies, getSeats, addReviews, getReviews, updateReviews, deleteReviews, getAllShows, getShowsbyDate, getSeatsbyShow, getMoviebyshow } = require('../controllers/userController');
const { getTheatrebyId, getMoviebyId, getShowtimeById } = require('../controllers/additionalController');
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
router.post('/addreviews', userAuth, addReviews);
router.put('/updatereviews', userAuth, updateReviews);
router.delete('/deletereviews', userAuth, deleteReviews);

module.exports = router;
