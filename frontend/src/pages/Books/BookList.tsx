import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBooks, deleteBook, searchBooks } from '../../services/api';
import { Book } from '../../types';
import PageHeader from '../../components/Layout/PageHeader';
import BookListComponent from '../../components/Books/BookList';
import SearchBar from '../../components/UI/SearchBar';
import Alert from '../../components/UI/Alert';
import Loader from '../../components/UI/Loader';

const BookList: React.FC = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);  // Change to boolean for clarity
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    loadBooks();
  }, []);

  // Load books from API
  const loadBooks = async () => {
    setLoading(true); // Show loader
    try {
      const data = await fetchBooks();
      setBooks(data);
      setError(null);
    } catch (err) {
      setError('Failed to load books. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false); // Hide loader after API call
    }
  };

  // Handle book addition (navigate to add book page)
  const handleAddBook = () => {
    navigate('/books/add');
  };

  // Handle search functionality
  const handleSearch = async (query: string) => {
    setLoading(true); // Show loader while searching
    try {
      const data = query ? await searchBooks(query) : await fetchBooks();
      setBooks(data);
    } catch (err) {
      setError('Failed to search books. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false); // Hide loader after search
    }
  };

  // Handle book deletion
  const handleDelete = async (id: number) => {
    setLoading(true); // Show loader during deletion
    try {
      await deleteBook(id);
      setBooks(books.filter(book => book.id !== id));
      setSuccessMessage('Book deleted successfully');
      setTimeout(() => setSuccessMessage(null), 3000); // Hide success message after 3 seconds
    } catch (err) {
      setError('Failed to delete book. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false); // Hide loader after deletion
    }
  };

  return (
    <div>
      <PageHeader
        title="Book Collection"
        actionButton={{
          label: "Add Book",
          onClick: handleAddBook
        }}
      />
      
      <div className="mt-6 mb-6">
        <SearchBar onSearch={handleSearch} placeholder="Search by title..." />
      </div>
      
      {error && (
        <div className="mb-6">
          <Alert 
            message={error} 
            type="error" 
            onClose={() => setError(null)} 
          />
        </div>
      )}
      
      {successMessage && (
        <div className="mb-6">
          <Alert 
            message={successMessage} 
            type="success" 
            onClose={() => setSuccessMessage(null)} 
          />
        </div>
      )}
      
      {/* Show loader when the books list is loading */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader size="large" />
        </div>
      ) : (
        <BookListComponent 
          books={books} 
          onDelete={handleDelete} 
        />
      )}
    </div>
  );
};

export default BookList;
