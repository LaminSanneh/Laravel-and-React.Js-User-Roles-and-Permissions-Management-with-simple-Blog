import React, { useEffect } from "react";
import { deleteUser, fetchUsers } from "../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../store";
import { Link } from "react-router-dom";

const UsersComponent = () => {
  const { users, loading } = useAppSelector((state) => {
    return state.user;
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("Fetching users");

    dispatch(fetchUsers())
      .unwrap()
      .then((response) => {
        console.log(`${response.length} Users fetched successfully`);
      })
      .catch((response) => {
        console.log(`Error fetching users: ${response.message}`);
      });
  }, [dispatch]);

  const handleUserDeleteClick = (id: number) => {
    const deleteUserConfirm = confirm(
      "Are you sure you wnat to delete this user?"
    );

    if (!deleteUserConfirm) {
      return;
    }

    dispatch(deleteUser(id))
      .unwrap()
      .then(() => {})
      .catch(() => {
        console.log("Error deleting user");
      });
  }

  if (loading) {
    return <h2 className="text-3xl">...Loading</h2>;
  }

  return (
    <>
      <h2 className="text-3xl mb-4 text-left pl-8 pt-4">Users List</h2>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-slate-50">
            <th className="p-4 pl-8 pb-3 text-slate-400 text-left border-b">
              Name
            </th>
            <th className="p-4 pl-8 pb-3 text-slate-400 text-left border-b">
              Phone
            </th>
            <th className="p-4 pl-8 pb-3 text-slate-400 text-left border-b">
              Roles
            </th>
            <th className="p-4 pl-8 pb-3 text-slate-400 text-left border-b">
              Address
            </th>
            <th className="p-4 pl-8 pb-3 text-slate-400 text-left border-b">
              Status
            </th>
            <th className="p-4 pl-8 pb-3 text-slate-400 text-left border-b">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {users.map((user, index) => {
            return (
              <tr key={index}>
                <td className="p-4 text-left pl-8 text-slate-500 border-b border-slate-100">
                  {user.name}
                </td>
                <td className="p-4 text-left pl-8 text-slate-500 border-b border-slate-100">
                  [{user.roles.map(role => role.name).join(",")}]
                </td>
                <td className="p-4 text-left pl-8 text-slate-500 border-b border-slate-100">
                  {user.phone}
                </td>
                <td className="p-4 text-left pl-8 text-slate-500 border-b border-slate-100">
                  {user.address}
                </td>
                <td className="p-4 text-left pl-8 text-slate-500 border-b border-slate-100">
                  <label>
                    <input
                      className="accent-green-600"
                      type="checkbox"
                      readOnly
                      checked={user.active}
                    />{" "}
                    Active
                  </label>
                </td>
                <td className="p-4 text-left pl-8 text-slate-500 border-b border-slate-100">
                <Link
                    to={`/users/edit/${user.id}`}
                    className="rounded-lg hover:cursor-pointer p-2 bg-sky-500 text-white font-bold"
                  >
                    Edit User
                  </Link>
                  <a
                    onClick={() => {
                      handleUserDeleteClick(user.id);
                    }}
                    className="rounded-lg hover:cursor-pointer p-2 bg-red-500 text-white font-bold ml-4"
                  >
                    Delete User
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default UsersComponent;
