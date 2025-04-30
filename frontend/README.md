# Library Management System

A full-stack web application for managing books, authors, and categories in a library. This project consists of a Laravel backend API and a React frontend.

## Features

- **Books Management**: Add, edit, delete, and search books
- **Authors Management**: View and add authors
- **Categories Management**: View and add categories
- **Responsive UI**: Works on mobile, tablet, and desktop devices
- **Form Validation**: Client-side validation for all forms
- **Confirmation Dialogs**: Confirms before delete operations
- **Notifications**: Success and error notifications

## Project Structure

### Backend (Laravel)

- RESTful API endpoints for books, authors, and categories
- MySQL database with proper relationships
- Input validation and error handling
- CORS configured for frontend access

### Frontend (React)

- React with TypeScript for type safety
- React Router for navigation
- Axios for API communication
- Tailwind CSS for styling
- Responsive and mobile-friendly design

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd librairie-backend
   ```

2. Install dependencies:
   ```
   composer install
   ```

3. Copy the .env.example file to .env:
   ```
   cp .env.example .env
   ```

4. Generate application key:
   ```
   php artisan key:generate
   ```

5. Configure your database in the .env file:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=library
   DB_USERNAME=root
   DB_PASSWORD=
   ```

6. Run migrations to create database tables:
   ```
   php artisan migrate
   ```

7. Start the development server:
   ```
   php artisan serve
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd library-management-system
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a .env file in the root of the project:
   ```
   VITE_API_URL=http://localhost:8000/api
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to the provided URL (usually http://localhost:5173)

## API Endpoints

### Books
- GET /api/books - Get all books
- GET /api/books/{id} - Get a specific book
- POST /api/books - Create a new book
- PUT /api/books/{id} - Update a book
- DELETE /api/books/{id} - Delete a book
- GET /api/books/search?query={query} - Search books by title

### Authors
- GET /api/authors - Get all authors
- POST /api/authors - Create a new author

### Categories
- GET /api/categories - Get all categories
- POST /api/categories - Create a new category

## Technologies Used

- **Backend**: Laravel 12, MySQL
- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Libraries**: Axios, React Router, Lucide React (for icons)