<?php

namespace Tests\Feature;

use App\Models\Post;
use App\Models\Role;
use App\Models\User;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class PostsControllerTest extends TestCase
{
    private Role $adminRole;
    private Role $editorRole;
    private Role $userRole;
    
    private User $admin;
    private User $editor;
    private User $user;
    
    private Post $adminPost;
    private Post $editorPost1;
    private Post $userPost1;

    public function setUp(): void {
        parent::setUp();
        
        $this->adminRole = Role::find(Role::ROLE_ADMIN_ID);
        $this->editorRole = Role::find(Role::ROLE_EDITOR_ID);
        $this->userRole = Role::find(Role::ROLE_USER_ID);
        
        $this->admin = User::factory()->create();
        $this->admin->roles()->attach($this->adminRole->id);

        $this->editor = User::factory()->create();
        $this->editor->roles()->attach($this->editorRole->id);

        $this->user = User::factory()->create();
        $this->user->roles()->attach($this->userRole->id);
        
        $this->adminPost = Post::factory()->create([
            'author_id' => $this->admin->id
        ]);
        
        $this->editorPost1 = Post::factory()->create([
            'author_id' => $this->editor->id
        ]);
        
        $this->userPost1 = Post::factory()->create([
            'author_id' => $this->user->id
        ]);
    }
    
    public function test_admin_can_see_all_posts(): void
    {   
        Sanctum::actingAs($this->admin, ['*']);
        
        $response = $this->get('/api/posts');

        $response->assertStatus(200);
        
        $response->assertJsonCount(3);
        
        // Admin can create, read, update and delete all posts
        // only admin can create, update, delete and assign roles

        // Editor can create, read, update all posts
        
        // User can read all posts
        // User can update and delete only their posts
    }

    public function test_admin_can_create_posts(): void
    {   
        Sanctum::actingAs($this->admin, ['*']);
        
        $postData = [
            'title' => fake()->name,
            'body' => fake()->paragraph,
        ];

        $response = $this->postJson('/api/posts', $postData);

        $response->assertStatus(200);
        
        $this->assertDatabaseCount('posts', 4);
        $this->assertDatabaseHas('posts', array_merge(['author_id' => $this->admin->id], $postData));
        $response->assertJsonFragment($postData);
        $response->assertJsonPath('author.id', $this->admin->id);
    }

    public function test_admin_can_update_any_posts(): void
    {   
        Sanctum::actingAs($this->admin, ['*']);
        
        $postUpdateData = [
            'title' => fake()->name,
            'body' => fake()->paragraph,
        ];
        
        $response = $this->putJson("/api/posts/{$this->adminPost->id}", $postUpdateData);
        $response2 = $this->putJson("/api/posts/{$this->editorPost1->id}", $postUpdateData);
        $response3 = $this->putJson("/api/posts/{$this->userPost1->id}", $postUpdateData);

        $response->assertOk();
        $response2->assertOk();
        $response3->assertOk();
        
        $this->assertDatabaseCount('posts', 3);
        $this->assertDatabaseHas('posts', array_merge(['id' => $this->adminPost->id, 'author_id' => $this->admin->id], $postUpdateData));
        $this->assertDatabaseHas('posts', array_merge(['id' => $this->editorPost1->id, 'author_id' => $this->editor->id], $postUpdateData));
        $this->assertDatabaseHas('posts', array_merge(['id' => $this->userPost1->id, 'author_id' => $this->user->id], $postUpdateData));
        $response->assertJsonFragment(array_merge(['author_id' => $this->admin->id], $postUpdateData));
        $response2->assertJsonFragment(array_merge(['author_id' => $this->editor->id], $postUpdateData));
        $response3->assertJsonFragment(array_merge(['author_id' => $this->user->id], $postUpdateData));
    }
    
    public function test_admin_can_delete_any_post(): void
    {   
        Sanctum::actingAs($this->admin, ['*']);
        
        $this->assertDatabaseHas('posts', array_merge(['id' => $this->adminPost->id, 'author_id' => $this->admin->id]));
        $this->assertDatabaseHas('posts', array_merge(['id' => $this->editorPost1->id, 'author_id' => $this->editor->id]));
        $this->assertDatabaseHas('posts', array_merge(['id' => $this->userPost1->id, 'author_id' => $this->user->id]));
        
        $response = $this->deleteJson("/api/posts/{$this->adminPost->id}");
        $response2 = $this->deleteJson("/api/posts/{$this->editorPost1->id}");
        $response3 = $this->deleteJson("/api/posts/{$this->userPost1->id}");

        $response->assertStatus(200);
        $response2->assertStatus(200);
        $response3->assertStatus(200);
        
        $this->assertDatabaseMissing('posts', ['id' => $this->adminPost]);
        $this->assertDatabaseMissing('posts', ['id' => $this->editorPost1->id]);
        $this->assertDatabaseMissing('posts', ['id' => $this->userPost1->id]);
        $this->assertDatabaseEmpty('posts');
    }
    
    public function test_editor_can_delete_any_post(): void
    {   
        Sanctum::actingAs($this->editor, ['*']);
        
        $this->assertDatabaseHas('posts', array_merge(['id' => $this->adminPost->id, 'author_id' => $this->admin->id]));
        $this->assertDatabaseHas('posts', array_merge(['id' => $this->editorPost1->id, 'author_id' => $this->editor->id]));
        $this->assertDatabaseHas('posts', array_merge(['id' => $this->userPost1->id, 'author_id' => $this->user->id]));
        
        $response = $this->deleteJson("/api/posts/{$this->adminPost->id}");
        $response2 = $this->deleteJson("/api/posts/{$this->editorPost1->id}");
        $response3 = $this->deleteJson("/api/posts/{$this->userPost1->id}");

        $response->assertStatus(200);
        $response2->assertStatus(200);
        $response3->assertStatus(200);
        
        $this->assertDatabaseMissing('posts', ['id' => $this->adminPost->id]);
        $this->assertDatabaseMissing('posts', ['id' => $this->editorPost1->id]);
        $this->assertDatabaseMissing('posts', ['id' => $this->userPost1->id]);
        $this->assertDatabaseEmpty('posts');
    }
    
    public function test_editor_can_update_any_posts(): void
    {   
        Sanctum::actingAs($this->editor, ['*']);
        
        $postUpdateData = [
            'title' => fake()->name,
            'body' => fake()->paragraph,
        ];
        
        $response = $this->putJson("/api/posts/{$this->adminPost->id}", $postUpdateData);
        $response2 = $this->putJson("/api/posts/{$this->editorPost1->id}", $postUpdateData);
        $response3 = $this->putJson("/api/posts/{$this->userPost1->id}", $postUpdateData);

        $response->assertOk();
        $response2->assertOk();
        $response3->assertOk();
        
        $this->assertDatabaseCount('posts', 3);
        $this->assertDatabaseHas('posts', array_merge(['id' => $this->adminPost->id, 'author_id' => $this->admin->id], $postUpdateData));
        $this->assertDatabaseHas('posts', array_merge(['id' => $this->editorPost1->id, 'author_id' => $this->editor->id], $postUpdateData));
        $this->assertDatabaseHas('posts', array_merge(['id' => $this->userPost1->id, 'author_id' => $this->user->id], $postUpdateData));
        $response->assertJsonFragment(array_merge(['author_id' => $this->admin->id], $postUpdateData));
        $response2->assertJsonFragment(array_merge(['author_id' => $this->editor->id], $postUpdateData));
        $response3->assertJsonFragment(array_merge(['author_id' => $this->user->id], $postUpdateData));
    }
    
    public function test_editor_can_see_all_posts(): void
    {   
        Sanctum::actingAs($this->editor, ['*']);
        
        $response = $this->getJson('/api/posts');

        $response->assertStatus(200);
        
        $response->assertJsonCount(3);
    }
    
    public function test_editor_can_create_posts(): void
    {   
        Sanctum::actingAs($this->editor, ['*']);
        
        $postData = [
            'title' => fake()->name,
            'body' => fake()->paragraph,
        ];
        
        $response = $this->postJson('/api/posts', $postData);

        $response->assertStatus(200);
        
        $this->assertDatabaseCount('posts', 4);
        $this->assertDatabaseHas('posts', array_merge(['author_id' => $this->editor->id], $postData));
        $response->assertJsonFragment($postData);
    }

    public function test_user_can_see_all_posts(): void
    {   
        Sanctum::actingAs($this->user, ['*']);
        
        $response = $this->getJson('/api/posts');

        $response->assertStatus(200);
        
        $response->assertJsonCount(3);
    }
    
    public function test_user_can_create_posts(): void
    {   
        Sanctum::actingAs($this->user, ['*']);
        
        $postData = [
            'title' => fake()->name,
            'body' => fake()->paragraph,
        ];
        
        $response = $this->postJson('/api/posts', $postData);

        $response->assertStatus(200);
        
        $this->assertDatabaseCount('posts', 4);
        $this->assertDatabaseHas('posts', array_merge(['author_id' => $this->user->id], $postData));
        $response->assertJsonFragment($postData);
    }
    
    public function test_user_cannot_delete_other_posts_they_donot_own(): void
    {   
        Sanctum::actingAs($this->user, ['*']);
        
        $this->assertDatabaseHas('posts', array_merge(['id' => $this->adminPost->id, 'author_id' => $this->admin->id]));
        $this->assertDatabaseHas('posts', array_merge(['id' => $this->editorPost1->id, 'author_id' => $this->editor->id]));
        $this->assertDatabaseHas('posts', array_merge(['id' => $this->userPost1->id, 'author_id' => $this->user->id]));
        
        $response = $this->deleteJson("/api/posts/{$this->adminPost->id}");
        $response2 = $this->deleteJson("/api/posts/{$this->editorPost1->id}");
        $response3 = $this->deleteJson("/api/posts/{$this->userPost1->id}");

        $response->assertForbidden(200);
        $response2->assertForbidden(200);
        $response3->assertStatus(200);
        
        $this->assertDatabaseHas('posts', ['id' => $this->adminPost->id]);
        $this->assertDatabaseHas('posts', ['id' => $this->editorPost1->id]);
        $this->assertDatabaseMissing('posts', ['id' => $this->userPost1->id]);
        $this->assertDatabaseCount('posts', 2);
    }
    
    public function test_user_can_update_only_their_posts(): void
    {   
        Sanctum::actingAs($this->user, ['*']);
        
        $postData = [
            'title' => fake()->name,
            'body' => fake()->paragraph,
        ];

        $response = $this->postJson('/api/posts', $postData);
        
        $postUpdateData = [
            'title' => fake()->name,
            'body' => fake()->paragraph,
        ];
        
        $newPost = $response->json();
        
        $response = $this->putJson("/api/posts/{$newPost['id']}", $postUpdateData);
        $response2 = $this->putJson("/api/posts/{$this->adminPost->id}", $postUpdateData);
        $response3 = $this->putJson("/api/posts/{$this->editorPost1->id}", $postUpdateData);

        $response->assertOk();
        $response2->assertForbidden();
        $response3->assertForbidden();
        
        $updatedPost1 = $response->json();
        
        $this->assertDatabaseCount('posts', 4);
        $this->assertDatabaseHas('posts', array_merge(['id' => $newPost['id'], 'author_id' => $this->user->id], $postUpdateData));
        $this->assertDatabaseMissing('posts', array_merge(['author_id' => $this->editor->id], $postUpdateData));
        $this->assertDatabaseMissing('posts', array_merge(['author_id' => $this->admin->id], $postUpdateData));

        $response->assertJsonFragment(array_merge(['author_id' => $this->user->id], $updatedPost1));
    }
}
