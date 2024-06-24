<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Webmozart\Assert\InvalidArgumentException;

class UsersController extends Controller
{
    public function index() {
        Gate::authorize('viewAny', User::class);
        
        $users = User::with('roles')->get();

        return response()->json($users);
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
        ]);
        
        $data = $request->only(['name', 'email']);
                
        // Make a default password
        $data['password'] = Hash::make('password');

        $data['author_id'] = Auth::user()->id;
        Gate::authorize('create', User::class);

        $user = User::create($data);
        
        $user->roles()->attach(Role::ROLE_USER_ID);
        
        $user->load('roles');

        return response()->json($user);
    }
    
    public function find(int $userId)
    {
        $user = User::with('roles')->find($userId);

        Gate::authorize('view', $user);

        return response()->json($user);
    }
    
    public function update(Request $request, int $userId)
    {
        $data = $request->only(['name', 'phone', 'address', 'active']);

        $user = User::find($userId);

        Gate::authorize('update', $user);

        $user->update($data);
        
        if ($request->has('roles')) {
            $roleIdsWithTrue = collect($request->input('roles'))->filter(function ($roleValue, $index) {
                return $roleValue === true;
            })->keys()->toArray();

            $rolseToSync = Role::whereIn('id', $roleIdsWithTrue)->pluck('id')->toArray();

            $user->roles()->sync($rolseToSync);
        }

        return response()->json(array_merge($user->toArray(), ['roles' => $user->roles]));
    }
    
    public function delete(int $userId)
    {
        $user = User::find($userId);

        Gate::authorize('delete', $user);

        $deleted = $user->delete();

        if (!$deleted) {
            throw new InvalidArgumentException('Could Not Delete User');
        }

        return response()->json();
    }
}
