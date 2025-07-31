<?php
// librairiebackend/app/Http/Controllers/PostController.php
namespace App\Http\Controllers;

use App\Models\Post; // Assure-toi d’avoir un modèle Post
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        return response()->json(Post::all()); // Renvoie tous les posts en JSON
    }
}