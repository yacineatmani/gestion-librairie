// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { fetchBooks, deleteBook, searchBooks } from '../../services/api';
// import { Book } from '../../types';
// import PageHeader from '../../components/Layout/PageHeader';
// import SearchBar from '../../components/UI/SearchBar';
// import Alert from '../../components/UI/Alert';
// import Loader from '../../components/UI/Loader';

// const BookList: React.FC = () => {
//   const navigate = useNavigate();
//   const [books, setBooks] = useState<Book[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   useEffect(() => {
//     loadBooks();
//   }, []);

//   const loadBooks = async () => {
//     setLoading(true);
//     try {
//       const data = await fetchBooks();
//       setBooks(data);
//       setError(null);
//     } catch (err) {
//       setError('Failed to load books. Please try again later.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddBook = () => {
//     navigate('/books/add');
//   };

//   const handleSearch = async (query: string) => {
//     setLoading(true);
//     try {
//       const data = query ? await searchBooks(query) : await fetchBooks();
//       setBooks(data);
//     } catch (err) {
//       setError('Failed to search books. Please try again later.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     setLoading(true);
//     try {
//       await deleteBook(id);
//       setBooks(books.filter(book => book.id !== id));
//       setSuccessMessage('Book deleted successfully');
//       setTimeout(() => setSuccessMessage(null), 3000);
//     } catch (err) {
//       setError('Failed to delete book. Please try again later.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen py-8 px-4">
//       <PageHeader
//         title="Book Collection"
//         actionButton={{
//           label: "Add Book",
//           onClick: handleAddBook
//         }}
//       />

//       <div className="mt-6 mb-6 max-w-xl mx-auto">
//         <SearchBar onSearch={handleSearch} placeholder="Search by title..." />
//       </div>

//       {error && (
//         <div className="mb-6 max-w-xl mx-auto">
//           <Alert 
//             message={error} 
//             type="error" 
//             onClose={() => setError(null)} 
//           />
//         </div>
//       )}

//       {successMessage && (
//         <div className="mb-6 max-w-xl mx-auto">
//           <Alert 
//             message={successMessage} 
//             type="success" 
//             onClose={() => setSuccessMessage(null)} 
//           />
//         </div>
//       )}

//       {loading ? (
//         <div className="flex justify-center items-center h-40">
//           <Loader size="large" />
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
//           {books.length === 0 ? (
//             <div className="col-span-full text-center text-gray-500">
//               Aucun livre trouvé.
//             </div>
//           ) : (
//             books.map((book) => (
//               <div
//                 key={book.id}
//                 className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition"
//               >
//                 <img
//                   src={book.cover_image}
//                   alt={book.title}
//                   className="w-32 h-44 object-cover rounded mb-4 border"
//                 />
//                 <h3 className="text-lg font-semibold mb-1 text-center">{book.title}</h3>
//                 <p className="text-sm text-gray-600 mb-1">
//                   <span className="font-medium">Auteur :</span> {book.author?.name || 'N/A'}
//                 </p>
//                 <p className="text-sm text-gray-600 mb-1">
//                   <span className="font-medium">Catégorie :</span> {book.category?.name || 'N/A'}
//                 </p>
//                 <p className="text-sm text-gray-500 mb-3">
//                   <span className="font-medium">Année :</span> {book.publication_year}
//                 </p>
//                 <button
//                   onClick={() => handleDelete(book.id!)}
//                   className="mt-auto bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition"
//                 >
//                   Supprimer
//                 </button>
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookList;

import React from 'react';

const staticBooks = [
  {
    id: 1,
    title: "Harry Potter and the Philosopher's Stone",
    author: { name: "J.K. Rowling" },
    category: { name: "Fantasy" },
    publication_year: 1997,
    cover_image: "images/harry_potter.jpg",
  },
  {
    id: 2,
    title: "Foundation",
    author: { name: "Isaac Asimov" },
    category: { name: "Science Fiction" },
    publication_year: 1951,
    cover_image: "images/foundation.jpg",
  },
  {
    id: 3,
    title: "Sapiens: A Brief History of Humankind",
    author: { name: "Yuval Noah Harari" },
    category: { name: "History" },
    publication_year: 2011,
    cover_image: "images/sapiens.jpg",
  },
];

const BookList: React.FC = () => (
  <div className="bg-gray-50 min-h-screen py-8 px-4">
    <h1 className="text-2xl font-bold mb-6 text-center">Book Collection</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {staticBooks.map((book) => (
        <div
          key={book.id}
          className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition"
        >
          <img
            src={book.cover_image}
            alt={book.title}
            className="w-32 h-44 object-cover rounded mb-4 border"
          />
          <h3 className="text-lg font-semibold mb-1 text-center">{book.title}</h3>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Auteur :</span> {book.author.name}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Catégorie :</span> {book.category.name}
          </p>
          <p className="text-sm text-gray-500 mb-3">
            <span className="font-medium">Année :</span> {book.publication_year}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default BookList;