// src/pages/WatchlistPage.js
import React, { useEffect, useState } from "react";
import PageTemplate from '../components/templateMovieListPage';

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(storedWatchlist);
  }, []);

  return (
    <PageTemplate
      title="My Watchlist"
      movies={watchlist}
      action={(movie) => {
        // You can add actions for watchlist movies here
        return <></>;
      }}
    />
  );
};

export default WatchlistPage;
