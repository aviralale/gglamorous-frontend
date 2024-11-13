import { useState, useEffect, ChangeEvent } from "react";
import { CheckIcon, EyeIcon, EyeOffIcon } from "@/assets/Icons";
import { axiosInstance } from "@/auth/auth";
import { toast } from "react-toastify";

interface PasswordChecks {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
}

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean | null>(null);
  const [passwordChecks, setPasswordChecks] = useState<PasswordChecks>({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  useEffect(() => {
    setPasswordChecks({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [password]);

  useEffect(() => {
    if (confirmPassword) {
      setPasswordsMatch(password === confirmPassword);
    } else {
      setPasswordsMatch(null);
    }
  }, [password, confirmPassword]);

  const toggleCurrentPasswordVisibility = (): void => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = (): void => {
    setShowNewPassword(!showNewPassword);
  };

  const getConfirmPasswordBorderColor = (): string => {
    if (passwordsMatch === null) return "border-gray-300";
    return passwordsMatch ? "border-green-500" : "border-red-500";
  };

  const data = {
    current_password: currentPassword,
    new_password: password,
    re_new_password: confirmPassword,
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axiosInstance.post("auth/users/set_password/", data);
      toast.success("Password changed successfully");
      setCurrentPassword("");
      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to change password");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-2xl font-bold">Change Password</h1>
        <div className="relative">
          <input
            type={showCurrentPassword ? "text" : "password"}
            className="w-full py-2 border px-4 text-sm outline-none pr-10 rounded-md"
            placeholder="Current Password *"
            value={currentPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCurrentPassword(e.target.value)
            }
            required
          />
          <button
            type="button"
            onClick={toggleCurrentPasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showCurrentPassword ? (
              <EyeOffIcon className="size-5" />
            ) : (
              <EyeIcon className="size-5" />
            )}
          </button>
        </div>
        <div className="relative">
          <input
            type={showNewPassword ? "text" : "password"}
            className="w-full py-2 border px-4 text-sm outline-none pr-10 rounded-md"
            placeholder="New Password *"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            required
          />
          <button
            type="button"
            onClick={toggleNewPasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showNewPassword ? (
              <EyeOffIcon className="size-5" />
            ) : (
              <EyeIcon className="size-5" />
            )}
          </button>
        </div>
        <input
          type="password"
          className={`w-full py-2 border px-4 text-sm outline-none rounded-md ${getConfirmPasswordBorderColor()}`}
          placeholder="Retype Password *"
          value={confirmPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
          required
        />
        <div className="text-xs text-gray-600">
          <ul className="space-y-2">
            {(
              Object.entries(passwordChecks) as [
                keyof PasswordChecks,
                boolean
              ][]
            ).map(([check, isValid]) => (
              <li key={check} className="flex items-center gap-2">
                {isValid ? (
                  <CheckIcon className="size-4 text-green-500" />
                ) : (
                  <span className="w-4 h-4 inline-block" />
                )}
                {check === "length"
                  ? "At least 8 characters"
                  : check === "uppercase"
                  ? "At least one uppercase letter"
                  : check === "lowercase"
                  ? "At least one lowercase letter"
                  : check === "number"
                  ? "At least one number"
                  : "At least one special character"}
              </li>
            ))}
          </ul>
        </div>
        <button
          type="submit"
          disabled={
            !passwordChecks.length ||
            !passwordChecks.lowercase ||
            !passwordChecks.number ||
            !passwordChecks.special ||
            !passwordChecks.uppercase ||
            password !== confirmPassword
          }
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition-colors duration-200"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}
