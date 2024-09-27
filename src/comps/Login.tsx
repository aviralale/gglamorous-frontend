import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-2">Login</h1>
      <div className="flex flex-col gap-6">
        <form className="flex flex-col gap-3">
          <input
            type="email"
            className="py-2 border px-4 text-sm outline-none"
            placeholder="Email"
          />
          <input
            type="password"
            className="py-2 border px-4 text-sm outline-none"
            placeholder="Password"
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
    </>
  );
}
