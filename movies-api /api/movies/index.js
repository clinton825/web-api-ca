import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {getUpcomingMovies } from '../tmdb-api';
import { getMovieGenres  } from '../tmdb-api';
import { getPopularPeople } from '../tmdb-api';
import { getTrendingMovies } from '../tmdb-api';
import { getLatestMovies } from '../tmdb-api';
import { getPopularMovies } from '../tmdb-api';
import { searchMovies } from '../tmdb-api';
import { getMovieReviews } from '../tmdb-api'; 
import { protect } from '../../authenticate/authMiddleware.js';
const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));

// get movies genres
router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const genres = await getMovieGenres();
    res.status(200).json(genres);
}));



// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));

// get upcoming moviess
router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

// Get popular people
router.get('/tmdb/people', asyncHandler(async (req, res) => {
    try {
        const popularPeople = await getPopularPeople();
        res.status(200).json(popularPeople);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch popular people from TMDB',
            error: error.message
        });
    }
}));


// Get trending movies from TMDB
router.get('/tmdb/trending', asyncHandler(async (req, res) => {
    const movies = await getTrendingMovies();
    res.json(movies);
}));

// Get popular movies from TMDB
router.get('/tmdb/popular', asyncHandler(async (req, res) => {
    const movies = await getPopularMovies();
    res.json(movies);
}));

// Search movies
router.get('/tmdb/search', asyncHandler(async (req, res) => {
    const { q } = req.query;
    if (!q) {
        res.status(400).json({ message: 'Search query is required' });
        return;
    }
    const results = await searchMovies(q);
    res.json(results);
}));

// Get latest movies
router.get('/tmdb/latest', asyncHandler(async (req, res) => {
    const movies = await getLatestMovies();
    res.json(movies);
}));

// Get Movie Reviews
router.get('/tmdb/reviews/:id', asyncHandler(async (req, res) => {
    const movieId = req.params.id;
    
    if (!movieId) {
        return res.status(400).json({
            success: false,
            message: 'Movie ID is required'
        });
    }
    
    const reviews = await getMovieReviews(movieId);
    res.status(200).json(reviews);
}));

// Add new movie to database
router.post('/', protect, asyncHandler(async (req, res) => {
    const movie = await movieModel.create(req.body);
    res.status(201).json(movie);
}));

// Update movie
router.put('/:movieId', protect, asyncHandler(async (req, res) => {
    const movie = await movieModel.findByIdAndUpdate(
        req.params.movieId,
        req.body,
        { new: true }
    );
    
    if (!movie) {
        res.status(404).json({ message: 'Movie not found' });
        return;
    }
    
    res.json(movie);
}));

// Delete movie
router.delete('/:movieId', protect, asyncHandler(async (req, res) => {
    const movie = await movieModel.findByIdAndDelete(req.params.movieId);
    
    if (!movie) {
        res.status(404).json({ message: 'Movie not found' });
        return;
    }
    
    res.json({ message: 'Movie deleted' });
}));


export default router;