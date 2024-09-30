import React, { ChangeEvent, useState, useEffect } from "react";
import { axiosInstance } from "@/auth/auth";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string; // Assume this is in 'YYYY-MM-DD' format from backend
}

export default function MyDetails() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);

  useEffect(() => {
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
    } catch (err) {
      setUpdateStatus("Update failed. Please try again.");
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
    <div>
      <h1 className="text-xl mb-6">My Details</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* First Name Field */}
        <div className="flex flex-col border p-2">
          <label htmlFor="first_name" className="text-xs text-muted-foreground">
            First Name
          </label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            value={user.first_name}
            onChange={handleInputChange}
            className="outline-none bg-transparent"
          />
        </div>
        {/* Last Name Field */}
        <div className="flex flex-col border p-2">
          <label htmlFor="last_name" className="text-xs text-muted-foreground">
            Last Name
          </label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            value={user.last_name}
            onChange={handleInputChange}
            className="outline-none bg-transparent"
          />
        </div>
        {/* Email Field */}
        <div className="flex flex-col border p-2 bg-gray-100">
          <label htmlFor="email" className="text-xs text-muted-foreground">
            Email
          </label>
          <span id="email" title="Email address cannot be changed.">
            {user.email}
          </span>
        </div>
        {/* Phone Number Field */}
        <div className="flex flex-col border p-2">
          <label
            htmlFor="phone_number"
            className="text-xs text-muted-foreground"
          >
            Phone Number
          </label>
          <input
            id="phone_number"
            name="phone_number"
            type="tel"
            value={user.phone_number}
            onChange={handleInputChange}
            className="outline-none bg-transparent"
          />
        </div>
        {/* Birthday Field */}
        <div className="flex flex-col border p-2">
          <label
            htmlFor="date_of_birth"
            className="text-xs text-muted-foreground"
          >
            Birthday
          </label>
          <input
            id="date_of_birth"
            name="date_of_birth"
            type="date"
            value={user.date_of_birth}
            onChange={handleInputChange}
            className="outline-none bg-transparent"
          />
        </div>
        <button
          type="submit"
          className="border text-white uppercase p-2 bg-black hover:bg-transparent hover:text-black transition-all duration-200 ease-in-out"
        >
          Update my details
        </button>
      </form>
      {updateStatus && <p className="mt-4 text-center">{updateStatus}</p>}
    </div>
  );
}
