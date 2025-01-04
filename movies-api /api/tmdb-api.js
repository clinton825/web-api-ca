import fetch from 'node-fetch';

export const getUpcomingMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getMovieGenres = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};


export const getPopularPeople = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/person/popular?api_key=${process.env.TMDB_KEY}`
        );
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch data from TMDB');
        }
        return await response.json();
    } catch (error) {
        throw new Error(`TMDB API Error: ${error.message}`);
    }
};



export const getTrendingMovies = async (page = 1) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}`
        );
        
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const searchMovies = async (searchTerm) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&language=en-US&query=${searchTerm}&page=1&include_adult=false`
        );
        
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getPopularMovies = async (page = 1) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}`
        );
        
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getLatestMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/latest?api_key=${process.env.TMDB_KEY}`
        );
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
        
        return await response.json();
    } catch (error) {
        throw error;
    }
};
