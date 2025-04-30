import React, { useState, useEffect } from 'react';
import { Book, Author, Category } from '../../types';
import { fetchAuthors, fetchCategories } from '../../services/api';

interface BookFormProps {
  initialData?: Partial<Book>;
  onSubmit: (data: Omit<Book, 'id'>) => void;
  loading: boolean;
}

const BookForm: React.FC<BookFormProps> = ({ initialData = {}, onSubmit, loading }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [authorId, setAuthorId] = useState<number>(initialData.author_id || 0);
  const [categoryId, setCategoryId] = useState<number>(initialData.category_id || 0);
  const [publicationYear, setPublicationYear] = useState<number>(initialData.publication_year || new Date().getFullYear());
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadFormData = async () => {
      try {
        const [authorsData, categoriesData] = await Promise.all([
          fetchAuthors(),
          fetchCategories()
        ]);
        setAuthors(authorsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to load form data:', error);
      }
    };

    loadFormData();
  }, []);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!authorId) {
      newErrors.author_id = 'Please select an author';
    }
    
    if (!categoryId) {
      newErrors.category_id = 'Please select a category';
    }
    
    if (!publicationYear) {
      newErrors.publication_year = 'Publication year is required';
    } else if (publicationYear < 1000 || publicationYear > new Date().getFullYear()) {
      newErrors.publication_year = 'Please enter a valid year';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    const bookData: Omit<Book, 'id'> = {
      title: title.trim(),
      author_id: authorId,
      category_id: categoryId,
      publication_year: publicationYear
    };
    
    onSubmit(bookData);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 200 }, (_, i) => currentYear - i);

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors`}
          placeholder="Enter book title"
          disabled={loading}
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>
      
      <div className="mb-4">
        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
          Author
        </label>
        <select
          id="author"
          value={authorId || ''}
          onChange={(e) => setAuthorId(Number(e.target.value))}
          className={`w-full px-3 py-2 border ${errors.author_id ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors`}
          disabled={loading}
        >
          <option value="">Select an author</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
        {errors.author_id && <p className="mt-1 text-sm text-red-600">{errors.author_id}</p>}
      </div>
      
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          id="category"
          value={categoryId || ''}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          className={`w-full px-3 py-2 border ${errors.category_id ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors`}
          disabled={loading}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category_id && <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>}
      </div>
      
      <div className="mb-6">
        <label htmlFor="publicationYear" className="block text-sm font-medium text-gray-700 mb-1">
          Publication Year
        </label>
        <select
          id="publicationYear"
          value={publicationYear || ''}
          onChange={(e) => setPublicationYear(Number(e.target.value))}
          className={`w-full px-3 py-2 border ${errors.publication_year ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors`}
          disabled={loading}
        >
          <option value="">Select year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        {errors.publication_year && <p className="mt-1 text-sm text-red-600">{errors.publication_year}</p>}
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Book'}
        </button>
      </div>
    </form>
  );
};

export default BookForm;