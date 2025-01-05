# WEB-API-CA 2
**Name:** Clinton Bempah
**Student Number:** 20097793

---

## Features

Here is a list of additional features implemented in the API that were not in the labs or modifications to existing features:

- **/tmdb/movie/:id:** Get movie by ID.
- **/tmdb/movies/upcoming:** Fetch upcoming movies.
- **/tmdb/movies/popular:** Fetch popular movies.
- **/tmdb/movies/popular-actors:** Fetch popular actors.
- **/tmdb/movies/latest:** Get Latest Movies.
- **/tmdb/movies/search:** Search for movies.
- **/tmdb/movies/genre/:genre:** Get movies by genre.
- **/tmdb/movies/trending/:** Get trending movie.
- **/tmdb/movies/reviews/:id:** Fetch reviews for a specific movie.
- **Password Validation in User Registration:** Passwords must meet these criteria:
  - Minimum length: 8 characters.
  - At least one uppercase letter.
  - At least one lowercase letter.
  - At least one digit.
  - At least one special character.
- **User Authentication:** Users can create accounts, log in, and access features such as trending and upcoming popular movies and actors .

---

## Packages Used

- **express:** A minimal and flexible Node.js web application framework.
- **bcrypt:** A library for hashing passwords.
- **dotenv:** Loads environment variables from a `.env` file into `process.env`.
- **jsonwebtoken:** Implementation of JSON Web Tokens for secure authentication.
- **mongoose:** A MongoDB object modeling tool designed for asynchronous environments.

---

## Setup Requirements

To run the app locally after cloning the repository:

1. Install dependencies using `npm install`.
2. Set up a TMDB API key and update the configuration file with the key.
3. Ensure MongoDB is running.
4. Set up a MongoDB database and update the configuration file with the connection details.
5. Run the application using `npm run dev`.

The `npm run dev` command will concurrently start both the React app and the MongoDB database, preparing the development environment for testing.

### Example .env Configuration

```env
NODE_ENV=development
PORT=3000
HOST=localhost
MONGO_DB=YourMongoURL
SEED_DB=true
SECRET=YourJWTSecret
```

---

## API Design

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/movies` | GET | Gets a list of all movies. |
| `/api/movies/upcoming` | GET | Retrieves a list of upcoming movies. |
| `/api/movies/trending` | GET | Fetches a list of trending movies. |
| `/api/movies/popular` | GET | Gets a list of popular movies. |
| `/api/movies/{movieid}` | GET | Retrieves details for a specific movie. |
| `/api/movies/search?q={query}` | GET | Searches for movies based on the provided query. |
| `/api/movies/latest` | GET | Gets information about the latest movies. |
| `/api/movies/{movieid}/reviews` | POST | Creates a new review for a movie. |
| `/api/movies` | POST | Adds a new movie to the database. |
| `/api/movies/{movieid}` | PUT | Updates details for a specific movie. |
| `/api/movies/{movieid}` | DELETE | Deletes a specific movie from the database. |
| `/api/users` | POST | Creates a new user. |
| `/api/users/login` | POST | Logs in a user. |
| `/api/users/logout` | POST | Logs out a user. |
| `/api/users/me` | GET | Retrieves details for the logged-in user. |


---

## Testing Plan

Here is the testing plan to verify the features:

| Test Case ID | Endpoint | Description |
|--------------|----------|-------------|
| 1 | `/api/movies` | Verify fetching all movies. |
| 2 | `/api/movies/upcoming` | Verify fetching upcoming movies. |
| 3 | `/api/movies/trending` | Verify fetching trending movies. |
| 4 | `/api/movies/popular` | Verify fetching popular movies. |
| 5 | `/api/movies/{movieid}` | Verify fetching movie details. |
| 6 | `/api/movies/search` | Verify searching movies. |
| 7 | `/api/movies/latest` | Verify fetching the latest movies. |
| 8 | `/api/movies/{movieid}/reviews` | Verify creating a review. |
| 9 | `/api/movies` | Verify adding a new movie. |
| 10| `/api/movies/{movieid}` | Verify updating movie details. |
| 11| `/api/movies/{movieid}` | Verify deleting a movie. |

---

## Security and Authentication

### Security Measures:
- **JWT-based Authentication:** Secure user authentication using JSON Web Tokens.
- **Protected Routes:** Routes like `/api/movies/{movieid}/reviews` require authentication.

---

## Error Handling

Error responses follow these strategies:

1. **Server Errors (500):**
   ```json
   {
     "status": 500,
     "message": "Internal Server Error",
     "data": {
       "stack": "..."
     }
   }
   ```

2. **Client Errors (404):**
   ```json
   {
     "status": 404,
     "message": "Not Found"
   }
   ```

3. **General Errors:**
   ```json
   {
     "status": 400,
     "message": "Bad Request"
   }
   ```

For development environments, include a stack trace when `NODE_ENV=development`.

---

## Integration with React App

### Enhancements to React App:
- **Enhanced User Registration:** Integrated user registration.
- **Password Validation:** Enforced password criteria during registration.
- **User Authentication:** Implemented JWT-based authentication for secure login.
- **Error Handling:** Added error handling for API errors.
- **Routing:** Implemented navigation for all features.
- **Styling:** Improved UI/UX for login, signup, and other pages.
- **Search and Pagination:** Enhanced search and pagination functionality.
- **Movie Details:** Added detailed movie views.
- **Trending and Popular Features:** Implemented trending, upcoming, and popular movie views.
- **Actor Information:** Added views for popular actors.
- **Review Management:** Enabled adding, editing, and deleting movie reviews.

---

