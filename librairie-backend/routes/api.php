<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AuthorController;

// Routes pour les auteurs
Route::get('/authors', [AuthorController::class, 'index']);
Route::post('/authors', [AuthorController::class, 'store']);

// Routes pour les catégories
Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);

// Test route
Route::get('/test', function () {
    return 'ça marche';
});

// Routes CRUD pour les livres
Route::get('/books', [BookController::class, 'index']); // Lire tous les livres
Route::get('/books/{id}', [BookController::class, 'show']); // Lire un livre spécifique
Route::post('/books', [BookController::class, 'store']); // Créer un livre
Route::put('/books/{id}', [BookController::class, 'update']); // Mettre à jour un livre
Route::delete('/books/{id}', [BookController::class, 'destroy']); // Supprimer un livre