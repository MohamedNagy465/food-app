import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  }, []);

  const deleteUser = (email) => {
    const updatedUsers = users.filter((user) => user.email !== email);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    toast.success("🗑️ User deleted successfully!");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6 text-orange-600">👥 Manage Users</h1>

      {users.length === 0 ? (
        <p className="text-gray-600">No users found.</p>
      ) : (
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-orange-600 text-white">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.email}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 capitalize">
                  {user.role === "admin" ? (
                    <span className="text-red-500 font-semibold">Admin</span>
                  ) : (
                    <span className="text-green-600 font-semibold">User</span>
                  )}
                </td>
                <td className="p-3 text-center">
                  {user.role === "admin" ? (
                    <span className="text-gray-400 italic">Protected</span>
                  ) : (
                    <button
                      onClick={() => deleteUser(user.email)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Users;
