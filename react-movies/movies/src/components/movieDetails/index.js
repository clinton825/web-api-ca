import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import { getRecommendations } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import { Link } from "react-router-dom";

const chipStyle = { margin: 0.5 };

const MovieDetails = ({ movie }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data, error, isLoading, isError } = useQuery(
    ["recommendations", { id: movie.id }],
    getRecommendations
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography variant="h6" color="error">
      Error fetching recommendations: {error.message}
    </Typography>;
  }

  const recommendedMovies = data?.results || [];

  return (
    <>
      {/* Overview Section */}
      <Typography variant="h5" component="h3">
        Overview
      </Typography>
      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      {/* Genres */}
      <Paper component="ul" sx={{ display: "flex", flexWrap: "wrap", listStyle: "none", padding: 1.5, margin: 0 }}>
        <li>
          <Chip label="Genres" sx={chipStyle} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={chipStyle} />
          </li>
        ))}
      </Paper>

      {/* Movie Details */}
      <Paper component="ul" sx={{ display: "flex", flexWrap: "wrap", listStyle: "none", padding: 1.5, margin: 0 }}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip icon={<MonetizationIcon />} label={`${movie.revenue.toLocaleString()}`} />
        <Chip icon={<StarRate />} label={`${movie.vote_average} (${movie.vote_count})`} />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>

      {/* Production Countries */}
      <Paper component="ul" sx={{ display: "flex", flexWrap: "wrap", listStyle: "none", padding: 1.5, margin: 0 }}>
        <li>
          <Chip label="Production" sx={chipStyle} color="primary" />
        </li>
        {movie.production_countries.map((country) => (
          <li key={country.name}>
            <Chip label={country.name} sx={chipStyle} />
          </li>
        ))}
      </Paper>

      {/* Recommended Movies in a Card */}
      <Card sx={{ marginTop: 4 }}>
        <CardHeader title="Recommended Movies" />
        <CardContent>
          <Paper
            component="ul"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              listStyle: "none",
              padding: 1.5,
              gap: 1,
            }}
          >
            {recommendedMovies.length > 0 ? (
              recommendedMovies.map((recMovie) => (
                <li key={recMovie.id} style={{ listStyle: "none" }}>
                  <Link to={`/movies/${recMovie.id}`} style={{ textDecoration: "none" }}>
                    <Chip label={recMovie.title} clickable sx={chipStyle} />
                  </Link>
                </li>
              ))
            ) : (
              <Typography variant="body1">No recommendations available.</Typography>
            )}
          </Paper>
        </CardContent>
      </Card>

      {/* Reviews Drawer */}
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: "fixed",
          bottom: "1em",
          right: "1em",
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};

export default MovieDetails;
