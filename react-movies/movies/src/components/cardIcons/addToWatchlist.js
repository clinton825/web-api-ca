
import React from "react";
import IconButton from "@mui/material/IconButton"; 
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"; 
const AddToWatchlistIcon = ({ movie }) => {
  const handleAddToWatchlist = (e) => {
    e.preventDefault();

    // Get the current "to watch" list from localStorage
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    // Check if the movie is already in the watchlist
    const isMovieInWatchlist = watchlist.some((m) => m.id === movie.id);

    if (!isMovieInWatchlist) {
      // Add the movie to the watchlist and save it to localStorage
      const updatedWatchlist = [...watchlist, movie];
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
      console.log(`${movie.title} added to watchlist.`);
    } else {
      console.log(`${movie.title} is already in the watchlist.`);
    }
  };

  return (
    <IconButton aria-label="add to watchlist" onClick={handleAddToWatchlist}>
      <PlaylistAddIcon color="primary" />
    </IconButton>
  );
};

export default AddToWatchlistIcon;
