import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBook, updateBook } from '../../services/api';
import { Book } from '../../types';
import PageHeader from '../../components/Layout/PageHeader';
import BookForm from '../../components/Books/BookForm';
import Alert from '../../components/UI/Alert';
import Loader from '../../components/UI/Loader';

const EditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadBook(parseInt(id));
    }
  }, [id]);

  const loadBook = async (bookId: number) => {
    try {
      const data = await fetchBook(bookId);
      setBook(data);
    } catch (err) {
      setError('Failed to load book. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (bookData: Omit<Book, 'id'>) => {
    if (!id) return;
    
    try {
      setSaving(true);
      await updateBook(parseInt(id), bookData);
      navigate('/books', { state: { successMessage: 'Book updated successfully' } });
    } catch (err) {
      setError('Failed to update book. Please try again later.');
      console.error(err);
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader size="large" />
      </div>
    );
  }

  if (!book && !loading) {
    return (
      <div>
        <Alert 
          message="Book not found" 
          type="error" 
          onClose={() => navigate('/books')} 
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Edit Book" />
      
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
        {book && (
          <BookForm 
            initialData={book} 
            onSubmit={handleSubmit} 
            loading={saving}
          />
        )}
      </div>
    </div>
  );
};

export default EditBook;