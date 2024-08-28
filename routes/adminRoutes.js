var express = require('express');
const { addMovie, addshows, addTheatre, addSeats, deleteMovie, updateMovie, deleteAllShows } = require('../controllers/adminController');
const { adminAuth } = require('../middlewares/authorization')
const upload = require('../middlewares/upload-middleware');
var router = express.Router();


router.post('/addmovie', adminAuth, upload, addMovie);
router.post('/addtheatre', adminAuth, addTheatre);
router.post('/addshows/:id',adminAuth, addshows);
router.delete('/deleteallshows', deleteAllShows);
router.delete('/deletemovie', adminAuth, deleteMovie);
router.put('/updatemovie', adminAuth, upload, updateMovie);


module.exports = router;