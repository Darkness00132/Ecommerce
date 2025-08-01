import { useState } from "react";
import { FaEdit } from "react-icons/fa";

const initialUsers = [
  { name: "Mustafa", email: "example@gmail.com", role: "admin" },
];

const AdminUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Customer",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const { name, email, role } = formData;
    if (name && email && role) {
      setUsers([...users, { name, email, role }]);
      setFormData({ name: "", email: "", password: "", role: "user" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-base-content">
        User management
      </h1>
      <h2 className="my-6 text-lg font-semibold text-gray-500">Add new user</h2>

      {/* Form */}
      <form onSubmit={handleAddUser} className="space-y-4 mb-10">
        <div>
          <label className="label font-medium">Name</label>
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label font-medium">Email</label>
          <input
            name="email"
            type="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label font-medium">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label font-medium">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="user">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary ">
          Add User
        </button>
      </form>

      {/* Users Table */}
      <div className="overflow-x-auto border border-base-300 rounded-xl shadow">
        <table className="table w-full text-sm">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, idx) => (
                <tr key={idx}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role === "user" ? "Customer" : "Admin"}</td>
                  <td>
                    <button className="btn btn-sm btn-primary btn-outline">
                      <FaEdit className="mr-1" /> Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
