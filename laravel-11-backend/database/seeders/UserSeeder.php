<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $adminRole = Role::find(Role::ROLE_ADMIN_ID);
        $editorRole = Role::find(Role::ROLE_EDITOR_ID);
        $userRole = Role::find(Role::ROLE_USER_ID);
        
        $admin = User::factory()->create([
            'email' => 'lamin.evra@gmail.com',
            'is_admin' => true,
            'active' => true
        ]);
        $admin->roles()->attach($adminRole->id);

        $editor = User::factory()->create([
            'email' => 'lamin.evra+2@gmail.com',
            'is_admin' => false,
            'active' => true
        ]);
        $editor->roles()->attach($editorRole->id);
        
        $user = User::factory()->create([
            'email' => 'lamin.evra+3@gmail.com',
            'is_admin' => false,
            'active' => true
        ]);
        $user->roles()->attach($userRole->id);

        foreach (range(1, 10) as $num) {
            $user = User::factory()->create();
            $user->roles()->attach($userRole->id);
        }
    }
}
