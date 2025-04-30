import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchAuthors } from '../../services/api';
import { Author } from '../../types';
import PageHeader from '../../components/Layout/PageHeader';
import AuthorListComponent from '../../components/Authors/AuthorList';
import Alert from '../../components/UI/Alert';
import Loader from '../../components/UI/Loader';

const AuthorList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(
    location.state?.successMessage || null
  );

  useEffect(() => {
    loadAuthors();

    // Clear success message from location state
    if (location.state?.successMessage) {
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const loadAuthors = async () => {
    try {
      setLoading(true);
      const data = await fetchAuthors();
      setAuthors(data);
      setError(null);
    } catch (err) {
      setError('Failed to load authors. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAuthor = () => {
    navigate('/authors/add');
  };

  return (
    <div>
      <PageHeader
        title="Authors"
        actionButton={{
          label: "Add Author",
          onClick: handleAddAuthor
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
        {loading && authors.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <Loader size="large" />
          </div>
        ) : (
          <AuthorListComponent 
            authors={authors} 
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default AuthorList;