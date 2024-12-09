import React from "react";

const SortBy = ({ onSortChange }) => {
  return (
    <select onChange={(event) => onSortChange(event.target.value)}>
      <option value="popularity.desc">Most Popular</option>
      <option value="release_date.desc">Newest</option>
      <option value="vote_average.desc">Highest Rated</option>
      <option value="vote_average.asc">Lowest Rated</option>
    </select>
  );
};

export default SortBy;
