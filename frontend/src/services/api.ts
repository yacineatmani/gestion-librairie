import axios, { AxiosError } from 'axios';
import { Book, Author, Category, ApiResponse } from '../types';

// Define the error response shape for Laravel API
interface ErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 30000,
});

const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.code === 'ECONNREFUSED' || axiosError.code === 'ERR_NETWORK') {
      throw new Error('Unable to connect to the server. Please ensure the backend server is running.');
    }
    if (axiosError.response?.status === 404) {
      throw new Error('The requested resource was not found.');
    }
    throw new Error(axiosError.response?.data?.message || 'An unexpected error occurred.');
  }
  throw error;
};

// Book API functions
export const fetchBooks = async (): Promise<Book[]> => {
  try {
    const response = await api.get<ApiResponse<Book[]>>('/books');
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const fetchBook = async (id: number): Promise<Book> => {
  try {
    const response = await api.get<ApiResponse<Book>>(`/books/${id}`);
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createBook = async (data: FormData | Omit<Book, 'id'>): Promise<Book> => {
  try {
    const isFormData = data instanceof FormData;

    const response = await api.post<ApiResponse<Book>>('/books', data, {
      headers: isFormData
        ? { 'Content-Type': 'multipart/form-data' } // Laissez le navigateur gérer le boundary
        : undefined, // Utilisez les en-têtes par défaut pour JSON
    });

    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateBook = async (id: number, book: Partial<Book>): Promise<Book> => {
  try {
    const response = await api.put<ApiResponse<Book>>(`/books/${id}`, book);
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteBook = async (id: number): Promise<void> => {
  try {
    await api.delete(`/books/${id}`);
  } catch (error) {
    throw handleApiError(error);
  }
};

export const searchBooks = async (query: string): Promise<Book[]> => {
  try {
    const response = await api.get<ApiResponse<Book[]>>(`/books/search?query=${query}`);
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Author API functions
export const fetchAuthors = async (): Promise<Author[]> => {
  try {
    const response = await api.get<ApiResponse<Author[]>>('/authors');
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createAuthor = async (author: Omit<Author, 'id'>): Promise<Author> => {
  try {
    const response = await api.post<ApiResponse<Author>>('/authors', author);
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Category API functions
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get<ApiResponse<Category[]>>('/categories');
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createCategory = async (category: Omit<Category, 'id'>): Promise<Category> => {
  try {
    const response = await api.post<ApiResponse<Category>>('/categories', category);
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export default api;