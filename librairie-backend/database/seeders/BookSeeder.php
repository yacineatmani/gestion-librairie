<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Book;

class BookSeeder extends Seeder
{
    public function run()
    {
        Book::create([
            'title' => 'Harry Potter and the Philosopher\'s Stone',
            'author_id' => 1, // Assurez-vous que cet auteur existe
            'category_id' => 1, // Assurez-vous que cette catégorie existe
            'publication_year' => 1997,
            'cover_image' => 'images/harry_potter.jpg', // Chemin de l'image
        ]);

        Book::create([
            'title' => 'Foundation',
            'author_id' => 2,
            'category_id' => 2,
            'publication_year' => 1951,
            'cover_image' => 'images/foundation.jpg',
        ]);

        Book::create([
            'title' => 'Sapiens: A Brief History of Humankind',
            'author_id' => 3,
            'category_id' => 3,
            'publication_year' => 2011,
            'cover_image' => 'images/sapiens.jpg',
        ]);
        // $this->call(BookSeeder::class);
    }
}