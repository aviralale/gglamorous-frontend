import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddressForm() {
  return (
    <form className="flex flex-col gap-4 p-4">
      <input
        type="text"
        className="border p-2"
        placeholder="Address Name"
        required
      />
      <input
        type="text"
        className="border p-2"
        placeholder="Recepient's Name"
        required
      />
      <input
        type="text"
        className="border p-2"
        placeholder="Street Name"
        required
      />
      <input
        type="text"
        className="border p-2"
        placeholder="Recepient's Phone Number"
        required
      />
      <Select required>
        <SelectTrigger className="rounded-none">
          <SelectValue placeholder="Select your city" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>City</SelectLabel>
            <SelectItem value="kathmandu">Kathmandu</SelectItem>
            <SelectItem value="lalitpur">Lalitpur</SelectItem>
            <SelectItem value="bhaktapur">Bhaktapur</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <button
        type="submit"
        className="uppercase border border-black p-2 hover:bg-black hover:text-white transition-all duration-200 ease-in-out"
      >
        Add Address
      </button>
    </form>
  );
}
