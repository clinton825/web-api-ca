import React, { useState } from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import AddToWatchlistIcon from '../components/cardIcons/addToWatchlist';
import Pagination from "@mui/material/Pagination";
const UpcomingMoviesPage = (props) => {
  // Use the new API call 'getUpcomingMovies'
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isError } = useQuery(['upcoming', page], () => getUpcomingMovies(page), {
    keepPreviousData: true, // Use this option to keep displaying the current data during loading of new page data
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;
  const totalPages = data.total_pages;

// Handle the page change
const handlePageChange = (event, value) => {
  setPage(value); // Set the page to the new value
};



  return (
    <>
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <AddToFavoritesIcon movie={movie} />  {/* Favorite icon */}
            <AddToWatchlistIcon movie={movie} />  {/* New Watchlist icon */}
          </>
        );
      }}
    />
    {/* Pagination component */}
    <Pagination
    count={totalPages}
    page={page}
    onChange={handlePageChange}
    color="primary"
    showFirstButton
    showLastButton
    style={{ paddingBottom: '20px', paddingTop: '20px', justifyContent: 'center', display: 'flex' }}
  />
  </>
);
  
};

export default UpcomingMoviesPage;
