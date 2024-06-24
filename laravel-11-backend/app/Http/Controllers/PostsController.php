<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use InvalidArgumentException;

class PostsController extends Controller
{
    public function index()
    {
        $posts = Post::with('author')->get();

        return response()->json($posts);
    }

    public function store(Request $request)
    {
        $data = $request->only(['title', 'body']);

        $data['author_id'] = Auth::user()->id;

        $post = Post::create($data);
        $post->load('author');

        return response()->json($post);
    }

    public function find(int $postId)
    {
        $post = Post::find($postId);

        Gate::authorize('view', $post);
        
        $post->load('author');

        return response()->json($post);
    }

    public function update(Request $request, int $postId)
    {
        $data = $request->only(['title', 'body']);

        $post = Post::with('author')->find($postId);

        Gate::authorize('update', $post);

        $post->update($data);

        return response()->json($post);
    }

    public function delete(int $postId)
    {
        $post = Post::find($postId);

         Gate::authorize('delete', $post);

        $deleted = $post->delete();

        if (!$deleted) {
            throw new InvalidArgumentException('Could Not Delete Post');
        }

        return response()->json();
    }
}
