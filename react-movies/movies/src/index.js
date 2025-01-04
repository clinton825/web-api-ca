import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import UpcomingMoviesPage from "./pages/UpcomingMovies";
import TrendingMoviesPage from './pages/TrendingMoviesPage';
import LatestMoviesPage from "./pages/LatestMoviePage.js";
import PopularMoviesPage from "./pages/PopularMoviesPage.js";
import ActorsPage from "./pages/actorsPage.js";
import ActorDetailsPage from "./pages/actorDetailsPage.js";

import LoginPage from "./pages/loginPage";
import AuthContextProvider from "./contexts/authContext";
import ProtectedRoutes from './protectedRoutes';
import SignUpPage from "./pages/signUpPage";



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContextProvider>
          <SiteHeader />
          <MoviesContextProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              
              <Route element={<ProtectedRoutes />}>
                <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
                <Route path="/reviews/:id" element={<MovieReviewPage />} />
                <Route path="/movies/:id" element={<MoviePage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/reviews/form" element={<AddMovieReviewPage />} />
                <Route path="/movies/UpcomingMovies" element={<UpcomingMoviesPage />} />
                <Route path="/movies/trending" element={<TrendingMoviesPage />} />
                <Route path="/movies/latest" element={<LatestMoviesPage />} />
                <Route path="/movies/popular" element={<PopularMoviesPage />} />
                <Route path="/people" element={<ActorsPage />} />
                <Route path="/actors/:id" element={<ActorDetailsPage />} />
                <Route path="/movies" element={<Navigate to="/" />} />
                <Route path="/logout" element={<LoginPage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Route>
            </Routes>
          </MoviesContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);