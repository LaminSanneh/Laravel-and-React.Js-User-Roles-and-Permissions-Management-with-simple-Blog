<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class UserProfileController extends Controller
{
    public function updateProfile(Request $request)
    {
        $user = auth()->user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => ['required', 'string'],
            'address' => ['required', 'string'],
//            'current_password' => [
//                'required',
//
//                function ($attribute, $value, $fail) use ($user) {
//                    if (!Hash::check($value, $user->password)) {
//                        $fail('Your password was not updated, since the provided current password does not match.');
//                    }
//                }
//            ],
            // 'current_password' => 'sometimes|current_password',
            // 'new_password' => [
            //     'required_if:current_password', 'min:8', 'confirmed', 'different:current_password'
            // ]
        ]);

        $userData = [
            'name' => $request->input('name'),
            'phone' => $request->input('phone'),
            'address' => $request->input('address'),
            // 'password' => Hash::make($validated['new_password'])
        ];

        $user = Auth::user();
        $updated = $user->update($userData);

        if (!$updated) {
            return response('Could not update profile', Response::HTTP_BAD_REQUEST);
        }

        return response($user->only('id', 'name', 'phone', 'address', 'roles'), 200);
    }

    public function user()
    {
        if (Auth::check()) {
            $user = Auth::user()->load('roles');
            return response($user->only('id', 'name', 'phone', 'address', 'roles'), 200);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }
}
