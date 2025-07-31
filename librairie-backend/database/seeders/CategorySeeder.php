<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run()
    {
        Category::create(['name' => 'Fantasy']); // id 1
        Category::create(['name' => 'Science Fiction']); // id 2
        Category::create(['name' => 'History']); // id 3
    }
}