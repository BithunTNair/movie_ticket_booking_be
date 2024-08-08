var express = require('express');
const { addMovie, addshows, addTheatre, addSeats, deleteMovie, updateMovie, deleteShows } = require('../controllers/adminController');
const {adminAuth}=require('../middlewares/authorization')
const upload = require('../middlewares/upload-middleware');
var router = express.Router();


router.post('/addmovie',adminAuth, upload, addMovie);
router.post('/addtheatre',adminAuth,addTheatre);
router.post('/addshows',adminAuth,addshows);
router.delete('/deleteshows',adminAuth,deleteShows);
router.delete('/deletemovie',adminAuth,deleteMovie);
router.put('/updatemovie',adminAuth,updateMovie);


module.exports = router;