<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    // Admin can create, read, update and delete all posts
    // only admin can create, update, delete and assign roles
    const ROLE_ADMIN_ID = 1;
    const ROLE_ADMIN_NAME = 'Admin Role';

    // Editor can create, and delete only their posts
    // Editor can read, update all posts
    const ROLE_EDITOR_ID = 2;
    const ROLE_EDITOR__NAME = 'Editor Role';

    // User can only read all posts
    // User cannot do any other actions
    const ROLE_USER_ID = 3;
    const ROLE_USER_NAME = 'User Role';

    protected $fillable = [
        'name',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_roles');
    }
}
