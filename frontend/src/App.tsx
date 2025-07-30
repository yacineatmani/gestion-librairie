
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BookList from './pages/Books/BookList';
import AddBook from './pages/Books/AddBook';
import EditBook from './pages/Books/EditBook';
import AuthorList from './pages/Authors/AuthorList';
import AddAuthor from './pages/Authors/AddAuthor';
import CategoryList from './pages/Categories/CategoryList';
import AddCategory from './pages/Categories/AddCategory';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/books" element={<BookList />} />
          <Route path="/" element={<Navigate to="/books" />} />
          <Route path="/books/add" element={<AddBook />} />
          <Route path="/books/edit/:id" element={<EditBook />} />
          <Route path="/authors" element={<AuthorList />} />
          <Route path="/authors/add" element={<AddAuthor />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/categories/add" element={<AddCategory />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;