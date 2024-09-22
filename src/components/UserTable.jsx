import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import trash from "./images/trash.svg";
import lock from "./images/lock.svg";
import unLock from "./images/unlock.svg";
import {
  deleteUsers,
  getUsers,
  blockUsers,
  unBlockUsers,
} from "../services/users";
import moment from "moment";

const fetchUsers = async (setUsers, logout) => {
  try {
    const res = await getUsers();
    setUsers(res.data);
  } catch (error) {
    if (
      error.response &&
      (error.response.status === 403 || error.response.status === 404)
    ) {
      logout();
    }
  }
};

function UserTable() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchUsers(setUsers, logout);
  }, []);

  const handleDelete = async () => {
    if (!selectedUsers.length) {
      return;
    }
    try {
      const response = await deleteUsers(selectedUsers);
      setMessage(response.data.message);
      fetchUsers(setUsers, logout);
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        (error.response.status === 403 ||
          error.response.status === 404 ||
          selectedUsers.includes(user.id))
      ) {
        logout();
      }
    } finally {
      setTimeout(() => setMessage(""), 1000);
    }
  };

  const handleBlock = async () => {
    if (!selectedUsers.length) {
      return;
    }
    try {
      const response = await blockUsers(selectedUsers);
      fetchUsers(setUsers, logout);
      setMessage(response.data);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 403 || error.response.status === 404)
      ) {
        logout();
      }
    } finally {
      setTimeout(() => setMessage(""), 1000);
    }
    setSelectedUsers([]);
  };

  const handleUnBlock = async () => {
    if (!selectedUsers.length) {
      return;
    }
    try {
      const response = await unBlockUsers(selectedUsers);
      fetchUsers(setUsers, logout);
      setMessage(response.data);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 403 || error.response.status === 404)
      ) {
        logout();
      }
    } finally {
      setTimeout(() => setMessage(""), 1000);
    }
    setSelectedUsers([]);
  };

  const handleSelectUser = (id) => {
    setSelectedUsers(
      selectedUsers.includes(id)
        ? selectedUsers.filter((userId) => userId !== id)
        : [...selectedUsers, id]
    );
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  console.log(users);

  return (
    <div className="wrapper">
      {message && (
        <div class="alert alert-danger" role="alert">
          {message}
        </div>
      )}
      <div className="row w-25">
        <p className="fs-4 col">Hello, {localStorage.getItem("user")}</p>
        <p onClick={logout} className=" text-primary pe-all">
          Logout
        </p>
      </div>
      <div className="row w-50 grid gap-3 actions">
        <button className="btn btn-light col" onClick={handleDelete}>
          <img width={24} height={24} src={trash} alt="trash" />
        </button>
        <button className="btn btn-light col" onClick={handleBlock}>
          <img width={24} height={24} src={lock} alt="lock" />
        </button>
        <button className="btn btn-light col" onClick={handleUnBlock}>
          <img width={24} height={24} src={unLock} alt="unlock" />
        </button>
      </div>
      {!users.length && !message && (
        <div className="row d-flex justify-content-center">
          <div class="spinner-border  text-primary" role="status"></div>
        </div>
      )}
      {users.length !== 0 && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={users && users.length === selectedUsers.length}
                  onChange={(e) =>
                    setSelectedUsers(
                      e.target.checked ? users.map((user) => user.id) : []
                    )
                  }
                />
              </th>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Created At</th>
              <th scope="col">Last Login</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                  />
                </td>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{moment(user.created_at).format()}</td>
                <td>{user.last_login && moment(user.last_login).format()}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserTable;
