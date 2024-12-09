import React from "react";
import { useQuery } from "react-query";
import { getGenres } from '../../api/tmdb-api'; // Adjust relative path

import Spinner from '../spinner';

const GenreFilter = ({ onFilterChange }) => {
  const { data, isLoading, error } = useQuery("genres", getGenres);

  if (isLoading) return <Spinner />;
  if (error) return <p>Failed to load genres</p>;

  return (
    <select onChange={(event) => onFilterChange(event.target.value)}>
      <option value="">All Genres</option>
      {data.genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  );
};

export default GenreFilter;
