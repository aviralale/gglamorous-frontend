import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddressForm from "./AddressForm";

export default function AddressBook() {
  return (
    <div>
      <div className="flex items-baseline gap-6">
        <h1 className="text-xl">Address Book</h1>
        <p className="text-muted-foreground text-sm">0 Saved Addresses</p>
      </div>
      <div
        className={`bg-gray-200 p-24 flex justify-center items-center flex-col`}
      >
        <Dialog>
          <DialogTrigger>
            <button className="uppercase border border-black p-2 text-white hover:bg-transparent bg-black hover:text-black transition-all duration-200 ease-in-out">
              Add an address
            </button>
          </DialogTrigger>
          <DialogContent>
            <AddressForm />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
