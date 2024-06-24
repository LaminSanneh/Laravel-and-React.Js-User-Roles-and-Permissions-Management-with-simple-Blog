import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchUser, updateUser } from "../store/slices/userSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditUserComponent = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [active, setActive] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const route = useParams();
  const loading = useAppSelector((state) => state.user.loading);
  const selectedRoleValues = {
    1: false,
    2: false,
    3: false
  };
  const [selectedRoles, setSelectedRoles] = useState<{[index: number]: boolean}>(selectedRoleValues);

  // // Later get these from backend
  const availableRoles = [
    {id: 1, name: "Admin Role"},
    {id: 2, name: "Editor Role"},
    {id: 3, name: "User Role"},
  ];

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const onAddressChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAddress(event.target.value);
  };

  const onActiveChange = () => {
    setActive(!active);
  };

  const onSelectedRoleChange = (roleId: number) => {
    setSelectedRoles({...selectedRoles, ...{[roleId]: !selectedRoles[roleId]}});
  }

  const handleEditUserSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!route.id) {
      return;
    }

    dispatch(updateUser({ id: parseInt(route.id), name, phone, address, active, roles: selectedRoles }))
      .unwrap()
      .then(() => {
        navigate("/users");
      })
      .catch((response) => {
        console.log(`Error updating user: ${response.message}`);
      });
  };

  const cancleUpdateUser = () => {
    navigate("/users");
  };

  useEffect(() => {
    let ignoreFetchedUserData = false;

    if (!route.id) {
      return;
    }

    dispatch(fetchUser(Number.parseInt(route.id, 10)))
      .unwrap()
      .then((response) => {
        if (ignoreFetchedUserData) {
          setName(response.name);
          setPhone(response.phone);
          setAddress(response.address);
          setActive(response.active);
          const selectedRolesFromServer = Object.assign({}, ...response.roles.map(role => ({ [role.id]: true })));
          setSelectedRoles({...selectedRoles, ...selectedRolesFromServer});
        }
      })
      .catch(() => {
        console.log("Error fetching user");
      });

    return () => {
      console.log("Clearing Use effect");

      ignoreFetchedUserData = true;
    };
  }, [route, dispatch]);

  if (loading) {
    return <h2 className="text-3xl">...Loading</h2>;
  }

  return (
    <div>
      <h2 className="text-3xl mb-4 text-left pl-8 pt-4">Edit User</h2>
      <form
        onSubmit={handleEditUserSubmit}
        action=""
        className="pl-8 pr-8 pt-4 w-100"
      >
        <input
          placeholder="title"
          name="title"
          className="block border p-2 rounded-md focus:ring-sky-400 mb-6 w-full"
          type="text"
          value={name}
          onChange={onNameChange}
        />
        <input
          placeholder="phone"
          name="phone"
          className="block border p-2 rounded-md focus:ring-sky-400 mb-6 w-full"
          type="text"
          value={phone}
          onChange={onPhoneChange}
        />
        <textarea
          onChange={onAddressChange}
          placeholder="address"
          className="block border p-2 rounded-md w-full mb-4"
          name="body"
          value={address}
        ></textarea>
        <label className="block left-0 text-left mb-4">
          <input
            className="accent-green-600"
            type="checkbox"
            checked={active}
            onChange={onActiveChange}
          />{" "}
          Active
        </label>
        <div className="text-left">
          <h4 className="text-left text-2xl mb-2 bg-orange-500 inline-block px-4 py-2 text-white rounded-xl">Roles</h4>
        </div>
        {
          availableRoles.map((role) => {
            return (
                  <label key={role.id} className="block left-0 text-left mb-4">
                    <input
                      className="accent-green-600"
                      type="checkbox"
                      checked={selectedRoles[role.id]}
                      onChange={() => { onSelectedRoleChange(role.id); }}
                    />{" "}
                    {role.name}
                  </label>
            );
          })
        }
        <div className="flex gap-4 mb-4 justify-between">
          <a
            className="p-4 hover:cursor-pointer rounded-lg bg-red-500 text-white"
            onClick={cancleUpdateUser}
          >
            Cancel
          </a>
          <button type="submit" className="bg-green-500 text-white">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserComponent;
