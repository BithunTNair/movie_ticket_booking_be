const MOVIES = require('../models/moviesModel');
const THEATRES=require('../models/theatreModel')

const cloudinaryInstance = require('../config/cloudinary');
const uploadMiddleware = require('../middlewares/upload-middleware')

const addMovie = async (req, res) => {
    try {
        console.log('hitted');
        // console.log(process.env.CLOUDINARY_NAME);
        // console.log(process.env.CLOUDINARY_API_KEY);
        // console.log(process.env.CLOUDINARY_SECRETE_KEY);
        // console.log(typeof process.env.CLOUDINARY_API_KEY)
        // console.log(cloudinaryInstance.config());
        if (!req.file) {
            return res.send('file is not visible')
        }
      
        const img = await cloudinaryInstance.uploader.upload(req.file.path, async (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: 'something went wrong' })
            }
            const imageUrl = result.url
            const { title, description, genre, director, rating } = req.body;

            const newMovies = new MOVIES({
                title: title,
                description: description,
                genre: genre,
                director: director,
                rating: rating,
                poster: imageUrl
            })
            const response = await newMovies.save()
            res.status(200).json({ message: 'movie added successfully', response })
        })
        
      
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'something went wrong' })
    }
};
const deleteMovie=async(req,res)=>{
    try {
        const {title}=req.body;
        const movieData= await MOVIES.findOne({title:title});
        if(!movieData){
            res.status(401).json({message:"movie is not found"});
        }else{
            MOVIES.deleteOne({title:title});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'something went wrong' })
    }
}

const addshows = () => {

};

const addTheatre = (req,res) => {
    try {
        const { name, location,movie } = req.body;

      THEATRES({
            name:name,
            location:location,
            movie:movie
        }).save().then((response)=>{
            res.status(200).json({message:"Theatre was added successfully",response})
        })
    } catch (error) {
        res.status(500).json({message:"something went wrong"})
        console.log(error);

    }
};

const addSeats = () => {

};



module.exports = { addMovie, addshows, addTheatre, addSeats ,deleteMovie}
