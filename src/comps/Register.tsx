import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { CheckIcon, EyeIcon, EyeOffIcon } from "@/assets/Icons";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "@/auth/auth";

interface PasswordChecks {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
}

export default function Register(): JSX.Element {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>("");

  const [passwordChecks, setPasswordChecks] = useState<PasswordChecks>({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const navigate = useNavigate();

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

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.replace(/\D/g, "");
    setPhoneNumber(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !passwordChecks.length &&
      !passwordChecks.lowercase &&
      !passwordChecks.number &&
      !passwordChecks.special &&
      !passwordChecks.uppercase &&
      password !== confirmPassword
    ) {
      setMessage("Password doesn't meet the required criterias.");
      return;
    }
    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
      password: password,
      re_password: confirmPassword,
    };
    try {
      const response = await registerUser(data);
      console.log(response);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const getConfirmPasswordBorderColor = (): string => {
    if (passwordsMatch === null) return "border-gray-300";
    return passwordsMatch ? "border-green-500" : "border-red-500";
  };

  return (
    <>
      <h1 className="text-2xl font-semibold mb-2">Create an account</h1>
      <div className="flex flex-col gap-6">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            className="py-2 border px-4 text-sm outline-none"
            placeholder="First Name *"
            required
            value={firstName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFirstName(e.target.value)
            }
          />
          <input
            type="text"
            className="py-2 border px-4 text-sm outline-none"
            placeholder="Last Name *"
            required
            value={lastName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLastName(e.target.value)
            }
          />
          <input
            type="tel"
            className="py-2 border px-4 text-sm outline-none"
            placeholder="Phone number"
            value={phoneNumber}
            onChange={handlePhoneChange}
          />
          <input
            type="email"
            className="py-2 border px-4 text-sm outline-none"
            placeholder="Email *"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full py-2 border px-4 text-sm outline-none pr-10"
              placeholder="Password *"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          <div className="text-xs">
            <ul>
              {(
                Object.entries(passwordChecks) as [
                  keyof PasswordChecks,
                  boolean
                ][]
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

          <div className="items-top flex space-x-2">
            <Checkbox id="tnc" />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="tnc"
                className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to receiving marketing and promotional offers via email.
              </label>
            </div>
          </div>
          <div className="items-top flex space-x-2">
            <Checkbox id="tnc" required />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="tnc"
                className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                By creating an account you agree to our website{" "}
                <Link to="" className="underline">
                  T&Cs
                </Link>{" "}
                and{" "}
                <Link to="" className="underline">
                  Privacy Policy
                </Link>
                *
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="border uppercase border-black py-2 px-4 outline-none hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
          >
            Create an account
          </button>
        </form>
      </div>
    </>
  );
}
