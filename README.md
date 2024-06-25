# Project Name: Laravel and React.Js User Roles and Permissions Management with simple Blog

## Project Status: Work In Progress

## Functional Requirement Items (some in the workings)
- Create new user
- See users list
- Create new post
- See users post
- Update User profile
- Login and Logout Functionality
- Registration Functionality
- Assign and unassign roles to users with an admin-role role.
- Editor role can only create, edit and delete all posts
- User role can only create, edit and delete his posts
- Admin role can add, edit and delete users. He can also create, update and delete all posts.
- All roles can view and update their user profiles
- Add d3.js statistics page to show user post creation over time - `WIP`

## Technical Requirement Items (some in the workings)
- UsersController and PostsController tests
- User roles and access control in backend using policies and controller gates. This is done usng Laravel Sanctum
- Add docker files for development
- Finish setting up docker files setup for production and deployment - `WIP`
- Add more extensive test to cober AuthController and UserProfileController tests - `WIP`
- Add cypress end to end testing - `WIP`
- Secure auth token storage on frontend. Currently stored as plaintext - `WIP`
- Centralize and make better the error handling from bacend api calls - `WIP`
- Add token refresh mechanism or detect when it is expired or invalidated - `WIP`

# How to run outside docker
### Laravel Server
```
cd laravel-folder
```
```
php artisan serve
```

### React Server
```
cd react-folder
```
```
npm run dev
```

# How to run with docker
Inside the same folder level as the `docker-compose.yml` file
run
```
docker-compose up -d --build
```

Visit `localhost:5173`

# Screens
<img src="readme-images/add-post-page.png" alt="add-post-page.png" width="200" /><img src="readme-images/add-user-page.png" alt="add-user-page" width="200" /><img src="readme-images/edit-user.png" alt="edit-user.pngn-2" width="200" /><img src="readme-images/login-page.png" alt="login-page.png" width="200" /><img src="readme-images/logout-page.png" alt="logout-page" width="200" /><img src="readme-images/posts-page-1.png" alt="posts-page-1" width="200" /><img src="readme-images/profile-page.png" alt="profile-page" width="200" /><img src="readme-images/register-page.png" alt="register-page" width="200" /><img src="readme-images/users-page-1.png" alt="users-page-1" width="200" />
