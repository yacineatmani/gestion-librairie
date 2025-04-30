import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchCategories } from '../../services/api';
import { Category } from '../../types';
import PageHeader from '../../components/Layout/PageHeader';
import CategoryListComponent from '../../components/Categories/CategoryList';
import Alert from '../../components/UI/Alert';
import Loader from '../../components/UI/Loader';

const CategoryList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(
    location.state?.successMessage || null
  );

  useEffect(() => {
    loadCategories();

    // Clear success message from location state
    if (location.state?.successMessage) {
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await fetchCategories();
      setCategories(data);
      setError(null);
    } catch (err) {
      setError('Failed to load categories. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = () => {
    navigate('/categories/add');
  };

  return (
    <div>
      <PageHeader
        title="Categories"
        actionButton={{
          label: "Add Category",
          onClick: handleAddCategory
        }}
      />
      
      {error && (
        <div className="mt-6">
          <Alert 
            message={error} 
            type="error" 
            onClose={() => setError(null)} 
          />
        </div>
      )}
      
      {successMessage && (
        <div className="mt-6">
          <Alert 
            message={successMessage} 
            type="success" 
            onClose={() => setSuccessMessage(null)} 
          />
        </div>
      )}
      
      <div className="mt-6">
        {loading && categories.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <Loader size="large" />
          </div>
        ) : (
          <CategoryListComponent 
            categories={categories} 
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryList;