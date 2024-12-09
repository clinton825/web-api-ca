import React, { useState } from "react";
import { useQuery } from "react-query";
import { getTrendingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import AddToWatchlistIcon from "../components/cardIcons/addToWatchlist";
import Pagination from "@mui/material/Pagination";

const TrendingMoviesPage = () => {
  const [page, setPage] = useState(1); // State for pagination

  // Fetch trending movies using react-query
  const { data, error, isLoading, isError } = useQuery(
    ["trendingMovies", page], // Query key includes page to refetch on change
    () => getTrendingMovies(page), // Fetch function with page parameter
    { keepPreviousData: true } // Keep data from previous pages during loading
  );

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <Spinner />
        <p>Loading trending movies...</p>
      </div>
    );
  }

  if (isError) {
    console.error(error);
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h1>Error Loading Data</h1>
        <p>{error.message || "An unexpected error occurred. Please try again later."}</p>
      </div>
    );
  }

  if (!data || !data.results || data.results.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h1>No Trending Movies Found</h1>
        <p>Check back later for the latest trending movies.</p>
      </div>
    );
  }

  const movies = data.results; // Extract movies from API response
  const totalPages = data.total_pages; // Extract total pages for pagination

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value); // Update page state
  };

  return (
    <>
      <PageTemplate
        title="Trending Movies"
        movies={movies}
        action={(movie) => (
          <>
            <AddToFavoritesIcon movie={movie} />
            <AddToWatchlistIcon movie={movie} />
          </>
        )}
      />
      {/* Pagination component */}
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        showFirstButton
        showLastButton
        style={{
          paddingBottom: "20px",
          paddingTop: "20px",
          justifyContent: "center",
          display: "flex",
        }}
      />
    </>
  );
};

export default TrendingMoviesPage;
