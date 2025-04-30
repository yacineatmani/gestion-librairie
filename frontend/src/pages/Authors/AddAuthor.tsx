import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAuthor } from '../../services/api';
import { Author } from '../../types';
import PageHeader from '../../components/Layout/PageHeader';
import AuthorForm from '../../components/Authors/AuthorForm';
import Alert from '../../components/UI/Alert';

const AddAuthor: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (authorData: Omit<Author, 'id'>) => {
    try {
      setLoading(true);
      await createAuthor(authorData);
      navigate('/authors', { state: { successMessage: 'Author added successfully' } });
    } catch (err) {
      setError('Failed to add author. Please try again later.');
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader title="Add New Author" />
      
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
        <AuthorForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
};

export default AddAuthor;