import { ChangeEvent, useState } from "react";
import { userData } from "@/data";

export default function MyDetails() {
  const user = userData;
  const [firstName, setFirstName] = useState<string>(user.first_name);
  const [lastName, setLastName] = useState<string>(user.last_name);
  const [phoneNumber, setPhoneNumber] = useState<string>(user.phone_number);
  const [birthday, setBirthday] = useState(user.birthday);
  return (
    <div>
      <h1 className="text-xl mb-6">My Details</h1>
      <form className="flex flex-col gap-4">
        {/* First Name Field */}
        <div className="flex flex-col border p-2">
          <label htmlFor="firstName" className="text-xs text-muted-foreground">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFirstName(e.target.value)
            }
            className="outline-none bg-transparent"
          />
        </div>

        {/* Last Name Field */}
        <div className="flex flex-col border  p-2">
          <label htmlFor="lastName" className="text-xs text-muted-foreground">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLastName(e.target.value)
            }
            className="outline-none bg-transparent"
          />
        </div>

        {/* Email Field */}
        <div className="flex flex-col border  p-2 bg-gray-100">
          <label htmlFor="email" className="text-xs text-muted-foreground">
            Email
          </label>
          <span id="email" title="Email address cannot be changed.">
            {user.email}
          </span>
        </div>

        {/* Phone Number Field */}
        <div className="flex flex-col border  p-2">
          <label htmlFor="phone" className="text-xs text-muted-foreground">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={phoneNumber}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPhoneNumber(e.target.value)
            }
            className="outline-none bg-transparent"
          />
        </div>

        {/* Birthday Field */}
        <div className="flex flex-col border  p-2">
          <label htmlFor="birthday" className="text-xs text-muted-foreground">
            Birthday
          </label>
          <input
            id="birthday"
            type="date"
            value={birthday}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setBirthday(e.target.value)
            }
            className="outline-none bg-transparent"
          />
        </div>
        <button className="border  text-white uppercase  p-2 bg-black hover:bg-transparent hover:text-black transition-all duration-200 ease-in-out">
          Update my details
        </button>
      </form>
    </div>
  );
}
