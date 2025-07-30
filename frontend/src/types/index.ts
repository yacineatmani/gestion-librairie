export interface Book {
    id?: number;
    title: string;
    author_id: number;
    category_id: number;
    publication_year: number;
    created_at?: string;
    updated_at?: string;
    author?: Author;
    category?: Category;
    cover_image?: string; // <-- Ajoute cette ligne
}
  
  export interface Author {
    id?: number;
    name: string;
    created_at?: string;
    updated_at?: string;
  }
  
  export interface Category {
    id?: number;
    name: string;
    created_at?: string;
    updated_at?: string;
  }
  
  export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
  }