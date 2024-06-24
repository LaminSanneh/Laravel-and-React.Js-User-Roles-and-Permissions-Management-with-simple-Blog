<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isAdmin();
    }

    public function view(User $user, User $givenUser): bool
    {
        return $user->isAdmin();
    }
    
    public function create(User $user): bool
    {
        return $user->isAdmin();
    }
    
    public function update(User $user, User $givenUser): bool
    {
        return $user->isAdmin();
    }
    
    public function delete(User $user, User $givenUser): bool
    {
        return $user->isAdmin();
    }
}
