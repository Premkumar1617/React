import { useState } from "react";
import type { User } from "../types/user";
import { userService } from "../services/userservice";

const AddUser = () => {
  const [form, setForm] = useState<User>({
  username: "",
  fullname: "",
  email: "",
  role: 1,
  password: "",
});


  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev:any) => ({
      ...prev,
      [name]:
        name === "roles"
          ? value // single role for now
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await userService.register(form);

      if (response.success) {
        setMessage(response.message);
        setForm({
            username: "",
            fullname: "",
            email: "",
            role: 1,
            password: "",
            });
      } else {
        setError(response.message);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>Add User</h2>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Role</label>
          <select
            name="roles"
            value={form.role}
            onChange={handleChange}
          >
            <option value="2">USER</option>
            <option value="1">ADMIN</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add User"}
        </button>
      </form>
    </div>
  );
};

export default AddUser;
