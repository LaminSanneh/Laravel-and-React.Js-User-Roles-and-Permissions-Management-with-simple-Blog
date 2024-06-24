<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = \Illuminate\Support\Facades\DB::table('users')->get();
        
        foreach (range(1, 10) as $num) {
            $user = $users->random();
            \App\Models\Post::factory()->create([
                'author_id' => $user->id
            ]);
        }
    }
}
