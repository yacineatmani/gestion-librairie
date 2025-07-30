import React, { useState } from 'react';

interface BookFormProps {
  onSubmit: (data: FormData) => void;
  loading: boolean;
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit, loading }) => {
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState<number | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [publicationYear, setPublicationYear] = useState<number | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('title', title);
    if (authorId) formData.append('author_id', authorId.toString());
    if (categoryId) formData.append('category_id', categoryId.toString());
    if (publicationYear) formData.append('publication_year', publicationYear.toString());
    if (coverImage) {
      console.log('Selected file:', coverImage); // Vérifiez ici
      formData.append('cover_image', coverImage);
    }
    console.log([...formData.entries()]);

  
    onSubmit(formData);
  };

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
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Enter book title"
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
          Author
        </label>
        <input
          type="number"
          id="author"
          value={authorId || ''}
          onChange={(e) => setAuthorId(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Enter author ID"
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <input
          type="number"
          id="category"
          value={categoryId || ''}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Enter category ID"
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="publicationYear" className="block text-sm font-medium text-gray-700 mb-1">
          Publication Year
        </label>
        <input
          type="number"
          id="publicationYear"
          value={publicationYear || ''}
          onChange={(e) => setPublicationYear(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Enter publication year"
          disabled={loading}
        />
      </div>

      <div className="mb-4">
  <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">
    Cover Image
  </label>
  <input
    type="file"
    id="coverImage"
    name="cover_image"
    accept="image/*" // Limite les fichiers acceptés aux images uniquement
    onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
    disabled={loading}
  />
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