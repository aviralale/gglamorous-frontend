import React, { ChangeEvent, useState, useEffect } from "react";
import { axiosInstance } from "@/auth/auth";
import { toast } from "react-toastify";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string; // Assume this is in 'YYYY-MM-DD' format from backend
  is_admin: boolean;
}

export default function MyDetails() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);

  useEffect(() => {
    document.title = "My Details";
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("auth/users/me/");
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setUpdateStatus("Updating...");
    try {
      const response = await axiosInstance.patch("auth/users/me/", {
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        date_of_birth: user.date_of_birth,
      });
      setUser(response.data);
      setUpdateStatus("Update successful!");
      toast.success("Update successful.");
    } catch (err) {
      setUpdateStatus("Update failed. Please try again.");
      toast.error("Update failed. Please try again.");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>No user data available</div>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Details</h1>
        {user?.is_admin && (
          <a
            href="https://admin.gglamorous.com"
            className="text-blue-500 hover:underline transition-colors duration-200"
          >
            Visit dashboard
          </a>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name Field */}
        <div className="border rounded-md p-3">
          <label
            htmlFor="first_name"
            className="text-sm text-gray-500 font-medium"
          >
            First Name
          </label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            value={user.first_name}
            onChange={handleInputChange}
            className="w-full outline-none bg-transparent"
          />
        </div>
        {/* Last Name Field */}
        <div className="border rounded-md p-3">
          <label
            htmlFor="last_name"
            className="text-sm text-gray-500 font-medium"
          >
            Last Name
          </label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            value={user.last_name}
            onChange={handleInputChange}
            className="w-full outline-none bg-transparent"
          />
        </div>
        {/* Email Field */}
        <div className="border rounded-md p-3 bg-gray-100">
          <label htmlFor="email" className="text-sm text-gray-500 font-medium">
            Email
          </label>
          <span id="email" title="Email address cannot be changed.">
            {user.email}
          </span>
        </div>
        {/* Phone Number Field */}
        <div className="border rounded-md p-3">
          <label
            htmlFor="phone_number"
            className="text-sm text-gray-500 font-medium"
          >
            Phone Number
          </label>
          <input
            id="phone_number"
            name="phone_number"
            type="tel"
            value={user.phone_number}
            onChange={handleInputChange}
            className="w-full outline-none bg-transparent"
          />
        </div>
        {/* Birthday Field */}
        <div className="border rounded-md p-3">
          <label
            htmlFor="date_of_birth"
            className="text-sm text-gray-500 font-medium"
          >
            Birthday
          </label>
          <input
            id="date_of_birth"
            name="date_of_birth"
            type="date"
            value={user.date_of_birth}
            onChange={handleInputChange}
            className="w-full outline-none bg-transparent"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-transparent hover:text-black transition-colors duration-200 ease-in-out"
        >
          Update my details
        </button>
      </form>
      {updateStatus && (
        <p className="mt-4 text-center text-green-500">{updateStatus}</p>
      )}
    </div>
  );
}
