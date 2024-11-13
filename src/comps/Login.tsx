import { loginUser } from "@/auth/auth";
import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";

import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { email, password };
    try {
      const response = await loginUser(data);
      console.log(response);
      setIsLoggedIn(true);

      navigate("/profile");
      toast.success("Logged in successfully.");
    } catch (error: any) {
      console.log(error);
      toast.success("Failed to login. Please check your credentials");
    }
  };
  return (
    <div className="pt-44">
      <h1 className="text-2xl font-semibold mb-2">Login</h1>
      <div className="flex flex-col gap-6">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="email"
            className="py-2 border px-4 text-sm outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="py-2 border px-4 text-sm outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="border border-black text-white bg-black py-2 px-4 outline-none hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
          >
            LOGIN
          </button>
          <Link to="" className="text-xs hover:underline">
            Forgot your password?
          </Link>
        </form>
      </div>
    </div>
  );
}
