import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { axiosInstance } from "@/auth/auth";
import { toast } from "react-toastify";

interface AddressFormProps {
  onSuccess: () => void;
}

export default function AddressForm({ onSuccess }: AddressFormProps) {
  const [addressName, setAddressName] = useState<string>("");
  const [recipientName, setRecipientName] = useState<string>("");
  const [streetName, setStreetName] = useState<string>("");
  const [recipientPhoneNumber, setRecipientPhoneNumber] = useState<string>("");
  const [cityName, setCityName] = useState<string>("");
  const [isDefault, setIsDefault] = useState<boolean>(false);

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const address = {
        address_name: addressName,
        recipient_name: recipientName,
        street_name: streetName,
        phone_number: recipientPhoneNumber,
        city: cityName,
        is_default: isDefault,
      };

      console.log("Address Submitted:", address);
      await axiosInstance.post("/addresses/", address);
      toast.success("Address Submitted");
      // Call onSuccess to close the dialog
      onSuccess();
    } catch (error) {
      console.error("Address Submission Error:", error);
      toast.error("Address Submission Error");
    }
  };

  return (
    <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
      <input
        type="text"
        className="border p-2"
        placeholder="Address Name"
        value={addressName}
        onChange={handleInputChange(setAddressName)}
        required
      />
      <input
        type="text"
        className="border p-2"
        placeholder="Recipient's Name"
        value={recipientName}
        onChange={handleInputChange(setRecipientName)}
        required
      />
      <input
        type="text"
        className="border p-2"
        placeholder="Street Name"
        value={streetName}
        onChange={handleInputChange(setStreetName)}
        required
      />
      <input
        type="text"
        className="border p-2"
        placeholder="Recipient's Phone Number"
        value={recipientPhoneNumber}
        onChange={handleInputChange(setRecipientPhoneNumber)}
        required
      />
      <input
        type="text"
        className="border p-2"
        placeholder="City Name"
        value={cityName}
        onChange={handleInputChange(setCityName)}
        required
      />

      <div className="items-top flex space-x-2">
        <Checkbox
          id="isDefaultAddress"
          checked={isDefault}
          onCheckedChange={(checked) => setIsDefault(checked as boolean)}
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="isDefaultAddress"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Set this as your default address
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="uppercase border border-black p-2 hover:bg-black hover:text-white transition-all duration-200 ease-in-out"
      >
        Add Address
      </button>
    </form>
  );
}
