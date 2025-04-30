import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCategory } from '../../services/api';
import { Category } from '../../types';
import PageHeader from '../../components/Layout/PageHeader';
import CategoryForm from '../../components/Categories/CategoryForm';
import Alert from '../../components/UI/Alert';

const AddCategory: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (categoryData: Omit<Category, 'id'>) => {
    try {
      setLoading(true);
      await createCategory(categoryData);
      navigate('/categories', { state: { successMessage: 'Category added successfully' } });
    } catch (err) {
      setError('Failed to add category. Please try again later.');
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader title="Add New Category" />
      
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
        <CategoryForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
};

export default AddCategory;