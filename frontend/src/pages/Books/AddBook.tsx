import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBook } from '../../services/api';
import { Book } from '../../types';
import PageHeader from '../../components/Layout/PageHeader';
import BookForm from '../../components/Books/BookForm';
import Alert from '../../components/UI/Alert';

const AddBook: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (bookData: Omit<Book, 'id'>) => {
    try {
      setLoading(true);
      await createBook(bookData);
      navigate('/books', { state: { successMessage: 'Book added successfully' } });
    } catch (err) {
      setError('Failed to add book. Please try again later.');
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader title="Add New Book" />
      
      {error && (
        <div className="mb-6">
          <Alert 
            message={error} 
            type="error" 
            onClose={() => setError(null)} 
          />
        </div>
      )}
      
      <div className="mt-6">
        <BookForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
};

export default AddBook;