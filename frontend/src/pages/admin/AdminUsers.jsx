import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrashAlt, FaPlusCircle, FaUser } from "react-icons/fa";
import { format } from "date-fns";
import axiosInstance from "../../axiosInstance/axiosInstance";
import useAuthUser from "../../store/useAuthUser";

const AdminUsers = () => {
  const [editedUser, setEditedUser] = useState({
    name: "",
    email: "",
    newEmail: "",
    role: "",
  });
  const editModalRef = useRef();

  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", "admin", searchTerm],
    queryFn: async () => {
      const response = await axiosInstance.get("/admin/users", {
        params: {
          search: searchTerm,
        },
      });
      return response.data.users;
    },
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const role = useAuthUser((state) => state.role);
  const isAddingUser = useAuthUser((state) => state.isAddingUser);
  const addUser = useAuthUser((state) => state.addUser);
  const isUpdatingUser = useAuthUser((state) => state.isUpdatingUser);
  const updateUser = useAuthUser((state) => state.updateUser);
  const isDeletingUser = useAuthUser((state) => state.isDeletingUser);
  const deleteUser = useAuthUser((state) => state.deleteUser);

  if (isLoading) return <p>Loading...</p>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const { name, email, password, role } = formData;
    if (name && email && password && role) {
      await addUser({ name, email, password, role });
      refetch();
      setFormData({ name: "", email: "", password: "", role: "user" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-base-content flex items-center gap-2">
          <FaUser /> User Management
        </h1>

        {/* Search Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearchTerm(e.target.search.value);
            refetch();
          }}
        >
          <input
            type="text"
            name="search"
            defaultValue=""
            placeholder="Search by name or email"
            className="input input-bordered w-full md:w-96"
          />
        </form>
      </div>
      {/* Add User Form */}
      <div className="bg-base-100 border border-base-300 p-6 rounded-xl shadow mb-10">
        <h2 className="text-xl font-semibold mb-4 text-primary flex items-center gap-2">
          <FaPlusCircle /> Add New User
        </h2>
        <form onSubmit={handleAddUser} className="grid md:grid-cols-2 gap-4">
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
              {(role === "superAdmin" || role === "owner") && (
                <option value="admin">Admin</option>
              )}
              {role === "owner" && (
                <option value="superAdmin">Super Admin</option>
              )}
            </select>
          </div>

          <div className="col-span-full">
            <button
              type="submit"
              disabled={isAddingUser}
              className={`btn btn-primary mt-2 ${
                isAddingUser ? "btn-disabled" : ""
              }`}
            >
              Add User
            </button>
          </div>
        </form>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto border border-base-300 rounded-xl shadow">
        <table className="table w-full text-sm">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.length > 0 ? (
              users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="capitalize">{user.role}</td>
                  <td>{format(user.createdAt, "yyyy-M-d / hh:mm a")}</td>
                  <td className="flex flex-wrap gap-1">
                    <button
                      type="button"
                      className="btn btn-sm btn-info btn-outline flex items-center gap-1"
                      onClick={() => {
                        setEditedUser({ ...user, newEmail: user.email });
                        if (editModalRef.current) {
                          editModalRef.current.checked = true;
                        }
                      }}
                    >
                      <FaEdit />
                      Edit
                    </button>
                    {(role === "superAdmin" || role === "owner") && (
                      <button
                        className={`btn btn-sm btn-outline btn-error flex items-center gap-1 ${
                          isDeletingUser ? "btn-disabled" : ""
                        }`}
                        disabled={isDeletingUser}
                        onClick={async () => {
                          await deleteUser(user.email);
                          refetch();
                        }}
                      >
                        <FaTrashAlt />
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <input
        type="checkbox"
        id="edit"
        className="modal-toggle"
        ref={editModalRef}
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold mb-4">Edit User</h3>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await updateUser(editedUser);
              refetch();
              editModalRef.current.checked = false;
            }}
            className="space-y-3"
          >
            <div>
              <label className="label">Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={editedUser.name}
                onChange={(e) =>
                  setEditedUser((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input input-bordered w-full"
                value={editedUser.newEmail}
                onChange={(e) =>
                  setEditedUser((prev) => ({
                    ...prev,
                    newEmail: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <label className="label">Role</label>
              <select
                className="select select-bordered w-full"
                value={editedUser.role}
                onChange={(e) =>
                  setEditedUser((prev) => ({ ...prev, role: e.target.value }))
                }
              >
                <option value="user">Customer</option>
                {role === "superAdmin" || role === "owner" ? (
                  <option value="admin">Admin</option>
                ) : null}
                {role === "owner" && (
                  <option value="superAdmin">Super Admin</option>
                )}
              </select>
            </div>

            <div className="modal-action">
              <label htmlFor="edit" className="btn btn-ghost">
                Cancel
              </label>
              <button
                type="submit"
                className={`btn btn-primary ${
                  isUpdatingUser ? "btn-disabled" : ""
                }`}
                disabled={isUpdatingUser}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
