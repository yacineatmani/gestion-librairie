import React from 'react';
import { Category } from '../../types';

interface CategoryListProps {
  categories: Category[];
  loading: boolean;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, loading }) => {
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

  if (categories.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-10 text-center">
        <p className="text-gray-500">No categories found. Add a new category to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-white overflow-hidden shadow-md rounded-lg">
      <ul className="divide-y divide-gray-200">
        {categories.map((category) => (
          <li key={category.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
            <div className="font-medium text-gray-900">{category.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;