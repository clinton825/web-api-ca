// models/favoriteModel.js
import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  movieId: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index to ensure a user can't favorite the same movie twice
favoriteSchema.index({ userId: 1, movieId: 1 }, { unique: true });

export default mongoose.model('Favorite', favoriteSchema);