<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller
{
    public function index(): JsonResponse
{
    $books = Book::with(['author', 'category'])->get();

    $books->transform(function ($book) {
        $book->cover_image = $book->cover_image
            ? asset('storage/' . $book->cover_image)
            : asset('storage/images/placeholder.jpg');
        return $book;
    });

    return response()->json([
        'success' => true,
        'data' => $books
    ]);
}

    public function store(Request $request): JsonResponse
    {
        Log::info('Store method called for Book', ['request' => $request->all()]);
        
        // Validation des données
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author_id' => 'required|exists:authors,id',
            'category_id' => 'required|exists:categories,id',
            'publication_year' => 'required|integer|min:1000|max:' . date('Y'),
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:16384',
        ]);
    
        // Gestion de l'image
        if ($request->hasFile('cover_image')) {
            $path = $request->file('cover_image')->store('images', 'public');
            $validated['cover_image'] = $path;
            Log::info('Image uploaded successfully', ['path' => $path]);
        } else {
            $validated['cover_image'] = 'images/placeholder.jpg'; // Image par défaut
            Log::info('No image uploaded, using default image');
        }
        $book = Book::create($validated);

        return response()->json([
            'success' => true,
            'data' => $book,
            'message' => 'Book created successfully'
        ], 201);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $book = Book::find($id);

        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author_id' => 'required|exists:authors,id',
            'category_id' => 'required|exists:categories,id',
            'publication_year' => 'required|integer|min:1000|max:'.date('Y'),
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('cover_image')) {
            if ($book->cover_image && $book->cover_image !== 'images/placeholder.jpg') {
                Storage::disk('public')->delete($book->cover_image);
            }
            $validated['cover_image'] = $request->file('cover_image')->store('images', 'public');
            Log::info('Image uploaded successfully', ['path' => $validated['cover_image']]);
        }

        $book->update($validated);

        return response()->json([
            'success' => true,
            'data' => $book,
            'message' => 'Book updated successfully'
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $book = Book::find($id);

        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }

        if ($book->cover_image && $book->cover_image !== 'images/placeholder.jpg') {
            Storage::disk('public')->delete($book->cover_image);
        }

        $book->delete();

        return response()->json(['message' => 'Book deleted successfully']);
    }

    public function show($id): JsonResponse
    {
        $book = Book::with(['author', 'category'])->find($id);
    
        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }
    
        // Ajoutez l'URL complète pour l'image de couverture
        $book->cover_image = $book->cover_image 
            ? asset('storage/' . $book->cover_image) 
            : asset('storage/images/placeholder.jpg');
    
        return response()->json([
            'success' => true,
            'data' => $book
        ]);
    }
}