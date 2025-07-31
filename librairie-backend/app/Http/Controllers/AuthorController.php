<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Models\Author;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AuthorController extends Controller
{
    public function index(): JsonResponse
    {
        $authors = Author::all();
        return response()->json([
            'success' => true,
            'data' => $authors
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $author = Author::create($validated);

        return response()->json([
            'success' => true,
            'data' => $author,
            'message' => 'Author created successfully'
        ], 201);
    }
}