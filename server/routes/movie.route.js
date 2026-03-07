const express = require('express');
const Movie = require('../models/movie.model.js')
const movieRouter = express.Router();

// Add a movie
movieRouter.post('/add-movie', async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.send({
            success: true,
            message: "New movie added!"
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Failed to add movie!"
        })
    }
});

//update movie
movieRouter.put('/update-movie/:id', async (req, res) => {
    try {
        const movieId = req.params.id;

        const movie = await Movie.findByIdAndUpdate(movieId, req.body);
        res.send({
            success: true,
            message: "Movie updated!",
            data: movie
        })

    } catch (error) {
        res.send({
            success: false,
            message: "Failed to update movie!"
        })
    }
})
//delete movie
movieRouter.delete('/delete-movie/:id', async (req, res) => {
    try {
        const movieId = req.params.id;

        const movie = await Movie.findByIdAndDelete(movieId, req.body);
        res.send({
            success: true,
            message: "Movie deleted!",
            data: movie
        })

    } catch (error) {
        res.send({
            success: false,
            message: "Failed to delete movie!"
        })
    }
})
//get all movies
movieRouter.get('/all-movies', async (req, res) => {
    try {
        const allMovies = await Movie.find();
        res.send({
            success: true,
            message: "All Movies fetched!",
            data: allMovies
        })
    } catch (error) {

    }
})
//get specific movie

movieRouter.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.send({
            success: true,
            message: 'Movie fetched !',
            data: movie

        })
    } catch (error) {
        res.send({
            success: false,
            message: 'Failed to fetch movie !'

        })
    }
})
module.exports = movieRouter;
