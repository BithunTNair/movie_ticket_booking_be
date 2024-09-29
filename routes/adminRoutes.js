var express = require('express');
const { addMovie, addshows, addTheatre, addSeats, deleteMovie, updateMovie, deleteAllShows, getUsers, getowners, deleteUser, deleteOwner } = require('../controllers/adminController');
const { adminAuth, ownerAuth } = require('../middlewares/authorization')
const upload = require('../middlewares/upload-middleware');
const { getOwners } = require('../controllers/OwnerController');
var router = express.Router();


router.post('/addmovie', adminAuth, upload, addMovie);
router.post('/addtheatre', ownerAuth, addTheatre);
router.post('/addshows/:id', ownerAuth, addshows);
router.delete('/deleteallshows/:id', adminAuth, deleteAllShows);
router.delete('/deletemovie/:id', adminAuth, deleteMovie);
router.put('/updatemovie', adminAuth, upload, updateMovie);
router.get('/getownerdata', ownerAuth, getOwners);
router.get('/getusers', adminAuth, getUsers);
router.delete('/deleteuser', adminAuth, deleteUser);
router.get('/getowners', adminAuth, getowners);
router.delete('/deleteowner', adminAuth, deleteOwner);


module.exports = router;