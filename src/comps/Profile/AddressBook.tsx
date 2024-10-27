import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddressForm from "./AddressForm";
import { axiosInstance } from "@/auth/auth"; // Assuming axiosInstance is pre-configured

interface Address {
  id: number;
  address_name: string;
  recipient_name: string;
  street_name: string;
  phone_number: string;
  city: string;
  is_default: boolean;
}

export default function AddressBook() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);

  // Fetch addresses on component mount
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axiosInstance.get("/addresses/me/");
        setAddresses(response.data); // Assuming response data contains an array of addresses
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    fetchAddresses();
  }, []); // Empty dependency array ensures this runs only once

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-baseline justify-between gap-6 mb-6">
        <h1 className="text-2xl font-bold">Address Book</h1>
        <p className="text-muted-foreground text-sm">
          {addresses.length} Saved Addresses
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <div
              key={address.id}
              className={`flex flex-col justify-between border p-4 aspect-square ${
                address.is_default ? "border-black" : "border-gray-400"
              }`}
            >
              <div className="flex items-baseline justify-between ">
                <h2 className="font-semibold uppercase underline truncate mb-2">
                  {address.address_name}
                </h2>
              </div>
              <div>
                <p className="uppercase  mb-1">{address.recipient_name}</p>
                <p className="text-sm mb-1">{address.street_name} Street</p>
                <p className="text-sm mb-1">{address.city} City</p>
                <p className="text-sm mb-1">Phone: {address.phone_number}</p>
              </div>
              <p className="text-xs text-muted-foreground italic">
                {address.is_default && "Default address"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 col-span-full">
            No addresses saved.
          </p>
        )}
      </div>
      <div className="mt-8 flex justify-center">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger>
            <button
              className="uppercase border-2 border-black px-6 py-3 text-white bg-black hover:bg-white hover:text-black transition-all duration-300 ease-in-out font-medium"
              onClick={() => setIsDialogOpen(true)}
            >
              Add an address
            </button>
          </DialogTrigger>
          <DialogContent>
            <AddressForm onSuccess={handleDialogClose} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
