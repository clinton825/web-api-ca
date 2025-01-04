import express from 'express';
import asyncHandler from 'express-async-handler';
import FavoriteModel from './favoritesModel.js';
import movieModel from '../movies/movieModel.js';

const router = express.Router();

// Get user's favorites
router.get('/', asyncHandler(async (req, res) => {
    const userId = req.user._id;
    let { page = 1, limit = 10 } = req.query;
    [page, limit] = [+page, +limit];

    const skip = (page - 1) * limit;

    const [favorites, total] = await Promise.all([
        FavoriteModel.find({ userId })
            .sort({ addedAt: -1 })
            .skip(skip)
            .limit(limit),
        FavoriteModel.countDocuments({ userId })
    ]);

    // Get movie details for each favorite
    const movieIds = favorites.map(f => f.movieId);
    const movies = await movieModel.find({ id: { $in: movieIds } });

    const results = favorites.map(fav => {
        const movie = movies.find(m => m.id === fav.movieId);
        return {
            ...movie.toObject(),
            addedAt: fav.addedAt
        };
    });

    res.json({
        page,
        total_pages: Math.ceil(total / limit),
        total_results: total,
        results
    });
}));

// Add movie to favorites
router.post('/:movieId', asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const movieId = parseInt(req.params.movieId);

    // Check if movie exists
    const movie = await movieModel.findByMovieDBId(movieId);
    if (!movie) {
        res.status(404).json({ message: 'Movie not found' });
        return;
    }

    try {
        const favorite = await FavoriteModel.create({ userId, movieId });
        res.status(201).json({
            message: 'Movie added to favorites',
            favoriteId: favorite._id
        });
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error
            res.status(400).json({ message: 'Movie already in favorites' });
        } else {
            throw error;
        }
    }
}));

// Remove from favorites
router.delete('/:movieId', asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const movieId = parseInt(req.params.movieId);

    const result = await FavoriteModel.findOneAndDelete({ userId, movieId });
    if (result) {
        res.status(200).json({ message: 'Movie removed from favorites' });
    } else {
        res.status(404).json({ message: 'Movie not found in favorites' });
    }
}));

// Check if movie is in favorites
router.get('/:movieId/check', asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const movieId = parseInt(req.params.movieId);

    const isFavorite = await FavoriteModel.isFavorite(userId, movieId);
    res.json({ isFavorite });
}));

export default router;