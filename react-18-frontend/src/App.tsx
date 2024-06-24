import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UsersComponent from "./components/UsersComponent";
import AddPostComponent from "./components/AddPostComponent";
import PostsComponent from "./components/PostsComponent";
import { useAppDispatch, useAppSelector } from "./store";
import EditPostComponent from "./components/EditPostComponent";
import EditUserComponent from "./components/EditUserComponent";
import LoginComponent from "./components/LoginComponent";
import LogoutComponent from "./components/LogoutComponent";
import RegisterComponent from "./components/RegisterComponent";
import UserProfileComponent from "./components/UserProfileComponent";
import AddUserComponent from "./components/AddUserComponent";
import { getUser } from "./store/slices/userProfileSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedLink from "./components/ProtectedLink";
import UnProtectedLink from "./components/UnProtected";
// import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state) => {
    return state.userProfile;
  });

  const isAuthenticated = useAppSelector((state) => {
    return state.auth.isAuthenticated;
  });

  const AVAILABLE_ROLES = {
    ADMIN_ROLE_ID: 1,
    EDITOR_ROLE_ID: 2,
    USER_ROLE_ID: 3,
  };

  const ALL_AVAILABLE_ROLES = [
    AVAILABLE_ROLES.ADMIN_ROLE_ID,
    AVAILABLE_ROLES.EDITOR_ROLE_ID,
    AVAILABLE_ROLES.USER_ROLE_ID,
  ];

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <div>
      {(isAuthenticated && userProfile.user) && (
        <>
          <h1>Logged in as: {userProfile.user?.name}</h1>
          <h2>
            Roles: {userProfile.user?.roles.map((role) => role.name).join()}
          </h2>
        </>
      )}
      <h1 className="text-5xl mb-6 font-bold underline">
        User Roles and Permission Management
      </h1>
      <BrowserRouter>
        {/* <ToastContainer /> */}
        <div className="text-right mt-8 mb-8">
          <ProtectedLink
            requiredRoles={[AVAILABLE_ROLES.ADMIN_ROLE_ID]}
            to={"/users/create"}
            className="rounded-lg p-4 hover:cursor-pointer bg-emerald-500 text-white font-bold"
          >
            +Add User
          </ProtectedLink>
          <ProtectedLink
            requiredRoles={ALL_AVAILABLE_ROLES}
            to={"/posts/create"}
            className="rounded-lg p-4 hover:cursor-pointer hover bg-blue-400 text-white font-bold ml-4"
          >
            +Add Post
          </ProtectedLink>
          <UnProtectedLink
            to={"/login"}
            className="rounded-lg p-4 hover:cursor-pointer hover bg-gray-400 text-white font-bold ml-4"
          >
            Login
          </UnProtectedLink>
          <UnProtectedLink
            to={"/register"}
            className="rounded-lg p-4 hover:cursor-pointer hover bg-blue-400 text-white font-bold ml-4"
          >
            Register
          </UnProtectedLink>
          <ProtectedLink
            requiredRoles={ALL_AVAILABLE_ROLES}
            to={"/profile"}
            className="rounded-lg p-4 hover:cursor-pointer hover bg-blue-400 text-white font-bold ml-4"
          >
            Profile
          </ProtectedLink>
          <ProtectedLink
            requiredRoles={ALL_AVAILABLE_ROLES}
            to={"/logout"}
            className="rounded-lg p-4 hover:cursor-pointer hover bg-red-500 text-white font-bold ml-4"
          >
            Logout
          </ProtectedLink>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="min-h-[100px] shadow-lg hidden md:block col-span-12 md:col-span-3">
            <ul className="flex-grow rounded-lg bg-white p-4">
              <li className="">
                <ProtectedLink
                  requiredRoles={[AVAILABLE_ROLES.ADMIN_ROLE_ID]}
                  className="p-4 bg-white text-slate-500 border-b m-2 hover:bg-neutral-100 hover:rounded-lg hover:cursor-pointer text-left block"
                  to={"/users"}
                >
                  Users
                </ProtectedLink>
              </li>
              <li className="">
                <ProtectedLink
                  requiredRoles={ALL_AVAILABLE_ROLES}
                  className="p-4 bg-white text-slate-500 border-b m-2 hover:bg-neutral-100 hover:rounded-lg hover:cursor-pointer text-left block"
                  to={"/posts"}
                >
                  Posts
                </ProtectedLink>
              </li>
            </ul>
          </div>
          <div className="min-h-[100px] rounded-lg shadow-lg col-span-12 md:col-span-9">
            <Routes>
              <Route
                path="/users"
                element={
                  <ProtectedRoute
                    requiredRoles={[AVAILABLE_ROLES.ADMIN_ROLE_ID]}
                  >
                    <UsersComponent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users/create"
                element={
                  <ProtectedRoute
                    requiredRoles={[AVAILABLE_ROLES.ADMIN_ROLE_ID]}
                  >
                    <AddUserComponent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users/edit/:id"
                element={
                  <ProtectedRoute
                    requiredRoles={[AVAILABLE_ROLES.ADMIN_ROLE_ID]}
                  >
                    <EditUserComponent />
                  </ProtectedRoute>
                }
              />

              {/* Posts */}
              <Route
                path="/posts"
                element={
                  <ProtectedRoute requiredRoles={[]}>
                    <PostsComponent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/posts/create"
                element={
                  <ProtectedRoute requiredRoles={[]}>
                    <AddPostComponent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/posts/edit/:id"
                element={
                  <ProtectedRoute requiredRoles={[]}>
                    <EditPostComponent />
                  </ProtectedRoute>
                }
              />

              {/* Profile */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute requiredRoles={ALL_AVAILABLE_ROLES}>
                    <UserProfileComponent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/logout"
                element={
                  <ProtectedRoute requiredRoles={[]}>
                    <LogoutComponent />
                  </ProtectedRoute>
                }
              />

              {/* <Route path="/posts" element={<PostsComponent />} />
              <Route path="/posts/create" element={<AddPostComponent />} />
              <Route path="/posts/edit/:id" element={<EditPostComponent />} />
              <Route path="/profile" element={<UserProfileComponent />} /> */}
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/register" element={<RegisterComponent />} />
              {/* {userProfile.user === null && (
                <>
                </>
              )} */}
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

// const ExportedApp = React.memo(App, (prev, after) => {
//   console.log(prev, after);
//   debugger;
//   return true;
// });
export default App;
