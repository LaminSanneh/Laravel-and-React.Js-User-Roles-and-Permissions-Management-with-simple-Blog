<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create([
            'id' => Role::ROLE_ADMIN_ID,
            'name' => Role::ROLE_ADMIN_NAME
        ]);
        
        Role::create([
            'id' => Role::ROLE_EDITOR_ID,
            'name' => Role::ROLE_EDITOR__NAME
        ]);
        
        Role::create([
            'id' => Role::ROLE_USER_ID,
                'name' => Role::ROLE_USER_NAME
        ]);
    }
}
