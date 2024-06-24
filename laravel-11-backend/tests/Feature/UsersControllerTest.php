<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class UsersControllerTest extends TestCase
{
    private Role $adminRole;
    private Role $editorRole;
    private Role $userRole;
    
    private User $admin;
    private User $editor;
    private User $user;

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
    }
    
    public function test_admin_can_view_all_users(): void
    {   
        Sanctum::actingAs($this->admin, ['*']);
        
        $response = $this->get('/api/users');

        $response->assertStatus(200);
        
        $response->assertJsonCount(3);
        $response->assertJsonPath('0.roles.0.id', $this->admin->id);
    }
    
    public function test_admin_can_create_user(): void
    {   
        Sanctum::actingAs($this->admin, ['*']);
        
        $postData = [
            'name' => fake()->name,
            'email' => fake()->email
        ];
        
        $response = $this->postJson('/api/users', $postData);

        $response->assertOk();
        $this->assertDatabaseHas('users', ['name' => $postData['name'], 'email' => $postData['email']]);
    }
    
    public function test_admin_can_edit_single_user(): void
    {   
        Sanctum::actingAs($this->admin, ['*']);
        
        $updateData = [
            'name' => fake()->name,
            'email' => fake()->email
        ];
        
        $updateDataForEditor = array_merge($updateData, [
            'roles' => [
                Role::ROLE_ADMIN_ID => true,
                Role::ROLE_EDITOR_ID => false,
            ]
        ]);
        
        $response = $this->putJson("/api/users/{$this->admin->id}" , $updateData);
        $response2 = $this->putJson("/api/users/{$this->editor->id}", $updateDataForEditor);
        $response3 = $this->putJson("/api/users/{$this->user->id}", $updateData);

        $response->assertOk();
        $response2->assertOk();
        $response3->assertOk();
        
        $response->assertJsonFragment([
            'id' => $this->admin->id
        ]);
        $response2->assertJsonFragment([
            'id' => $this->editor->id,
        ]);
        $this->assertEquals(Role::ROLE_ADMIN_ID, $response2->json('roles')[0]['id']);
        $this->assertCount(1, $response2->json('roles'));
        $response3->assertJsonFragment([
            'id' => $this->user->id
        ]);
    }
    
    public function test_admin_can_view_single_user(): void
    {   
        Sanctum::actingAs($this->admin, ['*']);
        
        $response = $this->get("/api/users/{$this->admin->id}");
        $response2 = $this->get("/api/users/{$this->editor->id}");
        $response3 = $this->get("/api/users/{$this->user->id}");
        
        $response->assertOk();
        $response2->assertOk();
        $response3->assertOk();
        
        $response->assertJsonFragment([
            'id' => $this->admin->id
        ]);
        $response2->assertJsonFragment([
            'id' => $this->editor->id
        ]);
        $response3->assertJsonFragment([
            'id' => $this->user->id
        ]);

    }
    
    public function test_admin_can_delete_single_user(): void
    {   
        Sanctum::actingAs($this->admin, ['*']);
        
        $response = $this->deleteJson("/api/users/{$this->admin->id}");
        $response2 = $this->deleteJson("/api/users/{$this->editor->id}");
        $response3 = $this->deleteJson("/api/users/{$this->user->id}");

        $response->assertOk();
        $response2->assertOk();
        $response3->assertOk();
    }

    public function test_editor_cannot_view_all_users(): void
    {   
        Sanctum::actingAs($this->editor, ['*']);
        
        $response = $this->get('/api/users');

        $response->assertForbidden();
    }
    
    public function test_editor_cannot_view_single_user(): void
    {   
        Sanctum::actingAs($this->editor, ['*']);
        
        $response = $this->get("/api/users/{$this->admin->id}");
        $response2 = $this->get("/api/users/{$this->editor->id}");
        $response3 = $this->get("/api/users/{$this->user->id}");

        $response->assertForbidden();
        $response2->assertForbidden();
        $response3->assertForbidden();
    }
    
    public function test_editor_cannot_create_user(): void
    {   
        Sanctum::actingAs($this->editor, ['*']);
        
        $postData = [
            'name' => fake()->name,
            'email' => fake()->email
        ];
        
        $response = $this->postJson('/api/users', $postData);

        $response->assertForbidden();
        $this->assertDatabaseMissing('users', ['name' => $postData['name'], 'email' => $postData['email']]);
    }
    
    public function test_editor_cannot_edit_single_user(): void
    {   
        Sanctum::actingAs($this->editor, ['*']);
        
        $updateData = [
            'name' => fake()->name,
            'email' => fake()->email
        ];
        
        $response = $this->putJson("/api/users/{$this->admin->id}" , $updateData);
        $response2 = $this->putJson("/api/users/{$this->editor->id}", $updateData);
        $response3 = $this->putJson("/api/users/{$this->user->id}", $updateData);

        $response->assertForbidden();
        $response2->assertForbidden();
        $response3->assertForbidden();
    }
    
    public function test_editor_cannot_delete_single_user(): void
    {   
        Sanctum::actingAs($this->editor, ['*']);
        
        $response = $this->deleteJson("/api/users/{$this->admin->id}");
        $response2 = $this->deleteJson("/api/users/{$this->editor->id}");
        $response3 = $this->deleteJson("/api/users/{$this->user->id}");

        $response->assertForbidden();
        $response2->assertForbidden();
        $response3->assertForbidden();
    }
}
