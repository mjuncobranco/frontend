# MovieApp Frontend

## Description

This project is a React-based frontend developed with Vite, designed as the user interface for the Movie Management System. It provides functionalities such as browsing movies, managing user profiles, viewing movie details, and interacting with the backend through protected and public routes. The application utilizes React Context for state management and supports features like user authentication and responsive design.

---

## Features

- **Movie Features**:
  - Browse all available movies.
  - View detailed information about individual movies and watch movie trailers.
- **User Management**:
  - Register and log in with secure authentication.
-  Real-time password validation on register for better UX.
- View and update profile details such as user's avatar.
- **Favorites**:
  - Add and remove favorite movies from user's profile (requires authentication).
- **Contact Form**:
  - Send messages via the contact form to the backend.
- Navigating to Home page when message is sent successfully or detecting & showing error message to user.
- **Responsive Design**:
  - Optimized for various screen sizes.

---

## Technologies

- **Frontend Framework**: React with Vite
- **State Management**: React Context API
- **Styling**: CSS-in-JS for adjusting styledinamically on state or props change.
- **Routing**: React Router DOM

---

## Installation

1. Clone the repository:

   ```bash
   git clone <https://github.com/mjuncobranco/frontend.git>
   cd <frontend>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5174`.

---

## Components

- **Header**: Navigation bar displayed on all pages with login & register button when there's no user logged in or logout button & user's avatar when user is logged in.
- **Footer**: Footer section with additional link to contact form and copyright information.
- **MovieCard**: Displays movie information in a card layout with button to see details navigating to MovieDetails page.
- **ScrollToTop**: Ensures the page scrolls to the top when navigating.
- **Contact**: Form for sending messages.
- **Login**: User login form.
- **Register**: User registration form.

---

## Pages

- **Home**: Displays a list of movies.
- **MovieDetail**: Shows detailed information about a specific movie. Includes a button to add or remove user's favorite movies and button to watch movie trailer. 
- **Profile**: Allows users to view and update their profile information including avatar and remove favorite movies.
- See users list and includes a button to remove users.(requires auth & admin role only)
- **Contact**: Provides a contact form for users to send messages.

---

## Routing

The app uses React Router for navigation:

```jsx
function App() {
  
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact/message" element={<Contact />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MoviesProvider>
      <App />
    </MoviesProvider>
  </StrictMode>
);
```

---

## State Management

The application uses Context API for global state management:

- **AuthContext**:
  - Provides authentication state and methods (e.g., login, logout).
  - Wraps routes that require authentication.
- **MoviesContext**:
  - Manages the state for movies and favorites.
  - Provides methods to add or remove favorite movies.

---

## Testing

1. **User Authentication**:
   - Register a new user.
   - Log in with valid credentials.
   - Test protected routes (e.g., Profile).

2. **Movie Browsing**:
   - View the list of movies on the homepage.
   - Allows user to find movie by filtering by title easily.
   - Click on a movie to view details.

3. **Favorites Management**:
   - Add movies to the favorites list.
   - Remove movies from the favorites list.

4. **Contact Form**:
   - Fill in the form and submit a message.

---

## Future Enhancements

- Add search and filter functionality for movies.
- Implement pagination for better performance.
- Add animations and improved styling for a better user experience.
- Integrate email notifications for user registration and contact form submissions.

---
## Special thanks to
- Anton Hangano
- Ignacio Chicharro.
- Manuel Moraga Molina.
- Cristina Martin Muñoz
- Loli Murillo

## Author

Developed by Melina Junco Branco.


