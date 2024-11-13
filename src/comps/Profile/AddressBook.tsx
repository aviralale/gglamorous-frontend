import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddressForm from "./AddressForm";
import { axiosInstance } from "@/auth/auth";

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

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axiosInstance.get("/addresses/me/");
        setAddresses(response.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    fetchAddresses();
  }, []);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-baseline justify-between gap-6 mb-8">
        <h1 className="text-3xl font-bold">Address Book</h1>
        <p className="text-muted-foreground text-lg">
          {addresses.length} Saved Addresses
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <div
              key={address.id}
              className={`bg-white shadow-md rounded-md p-6 ${
                address.is_default
                  ? "border-2 border-black"
                  : "border-2 border-gray-200"
              }`}
            >
              <div className="flex items-baseline justify-between">
                <h2 className="font-semibold text-lg uppercase underline truncate mb-2">
                  {address.address_name}
                </h2>
              </div>
              <div>
                <p className="uppercase mb-2">{address.recipient_name}</p>
                <p className="text-base mb-2">{address.street_name} Street</p>
                <p className="text-base mb-2">{address.city} City</p>
                <p className="text-base mb-2">Phone: {address.phone_number}</p>
              </div>
              <p className="text-sm text-muted-foreground italic">
                {address.is_default && "Default address"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-base text-gray-500 col-span-full">
            No addresses saved.
          </p>
        )}
      </div>
      <div className="mt-8 flex justify-center">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger>
            <button className="uppercase border-2 border-black px-6 py-3 text-white bg-black hover:bg-white hover:text-black transition-all duration-300 ease-in-out font-medium">
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
