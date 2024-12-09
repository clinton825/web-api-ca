import React, { useState} from "react";
import { useQuery } from "react-query";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import {Pagination} from "@mui/material";

const HomePage = () => {
  const [page, setPage] = useState(1); // State to manage pagination


  const { data, error, isLoading, isError } = useQuery(
    ['discover', page],
    () => getMovies(page),
    { keepPreviousData: true } // Avoid UI flickering between pages
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>Something went wrong: {error.message}</h1>;
  }

  const movies = data.results;
  const totalPages = data.total_pages; // Extract total pages from API response

  
 
  const handlePageChange = (event, value) => {
    setPage(value); // Update the page state
  };

  return (
    <>
      <PageTemplate
  title="Discover Movies"
  movies={movies}
  action={(movie) => <AddToFavoritesIcon movie={movie} />}
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

export default HomePage;
