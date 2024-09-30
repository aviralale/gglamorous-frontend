import { useState, useEffect, ChangeEvent } from "react";
import { CheckIcon, EyeIcon, EyeOffIcon } from "@/assets/Icons";

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
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-xl">Change password</h1>

      <div className="relative">
        <input
          type={showCurrentPassword ? "text" : "password"}
          className="w-full py-2 border px-4 text-sm outline-none pr-10"
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
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          {showCurrentPassword ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
      <div className="relative">
        <input
          type={showNewPassword ? "text" : "password"}
          className="w-full py-2 border px-4 text-sm outline-none pr-10"
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
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          {showNewPassword ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
      <input
        type="password"
        className={`py-2 border px-4 text-sm outline-none ${getConfirmPasswordBorderColor()}`}
        placeholder="Retype Password *"
        value={confirmPassword}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setConfirmPassword(e.target.value)
        }
        required
      />
      <div className="text-xs">
        <ul>
          {(
            Object.entries(passwordChecks) as [keyof PasswordChecks, boolean][]
          ).map(([check, isValid]) => (
            <li key={check} className="flex items-center gap-2">
              {isValid ? (
                <CheckIcon className="size-4" />
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
      {passwordChecks.length &&
        passwordChecks.lowercase &&
        passwordChecks.number &&
        passwordChecks.special &&
        passwordChecks.uppercase &&
        password == confirmPassword && (
          <button
            type="submit"
            className="uppercase border border-black p-2 hover:bg-black hover:text-white transition-all duration-200 ease-in-out"
          >
            Change password
          </button>
        )}
    </div>
  );
}
