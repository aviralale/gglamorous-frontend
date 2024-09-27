export default function ProfileCard() {
  return (
    <div className="flex items-center justify-center gap-4 border-b pb-8">
      <span className="text-6xl w-28 flex justify-center items-center h-28 bg-gray-100 rounded-full">
        JD
      </span>
      <div className="h-full">
        <h1 className="text-xl font-semibold">John Doe</h1>
        <p className="text-sm">johndoe@example.com</p>
      </div>
    </div>
  );
}
