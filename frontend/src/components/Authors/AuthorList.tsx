import React from 'react';
import { Author } from '../../types';

interface AuthorListProps {
  authors: Author[];
  loading: boolean;
}

const AuthorList: React.FC<AuthorListProps> = ({ authors, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (authors.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-10 text-center">
        <p className="text-gray-500">No authors found. Add a new author to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-white overflow-hidden shadow-md rounded-lg">
      <ul className="divide-y divide-gray-200">
        {authors.map((author) => (
          <li key={author.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
            <div className="font-medium text-gray-900">{author.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorList;