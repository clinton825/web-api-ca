// api/favorites.js
import express from 'express';
import Favorite from '../models/favoriteModel';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// Get user's favorites
router.get('/', asyncHandler(async (req, res) => {
  const userId = req.user.id; // Assuming you have authentication middleware
  const favorites = await Favorite.find({ userId });
  res.json(favorites.map(f => f.movieId));
}));

// Add to favorites
router.post('/', asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { movieId } = req.body;
  
  const favorite = await Favorite.create({
    userId,
    movieId
  });
  
  res.status(201).json({ movieId: favorite.movieId });
}));

// Remove from favorites
router.delete('/:movieId', asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { movieId } = req.params;
  
  await Favorite.findOneAndDelete({
    userId,
    movieId: Number(movieId)
  });
  
  res.status(204).send();
}));

export default router;