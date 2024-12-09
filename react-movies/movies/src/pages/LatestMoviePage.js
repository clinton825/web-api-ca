import React from "react";
import { getLatestMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const LatestMoviesPage = () => {
  // Using useQuery to fetch the latest movie data
  const { data: movie, error, isLoading, isError } = useQuery('latest', getLatestMovies);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // Wrap the single movie in an array to pass it to PageTemplate, which expects an array of movies
  const movies = movie ? [movie] : [];

  return (
    <PageTemplate
      title="Latest Movie" 
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default LatestMoviesPage;
