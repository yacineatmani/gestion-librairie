<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Author;

class AuthorSeeder extends Seeder
{
    public function run()
    {
        Author::create(['name' => 'J.K. Rowling']);    // id 1
        Author::create(['name' => 'Isaac Asimov']);    // id 2
        Author::create(['name' => 'Yuval Noah Harari']); // id 3
    }
}