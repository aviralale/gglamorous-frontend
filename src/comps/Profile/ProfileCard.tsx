interface ProfileCardProps {
  firstName: string;
  lastName: string;
  email: string;
}
export default function ProfileCard({
  firstName,
  lastName,
  email,
}: ProfileCardProps) {
  const initials = firstName.slice(0, 1) + lastName.slice(0, 1);
  return (
    <div className="flex items-center justify-center gap-4 border-b pb-8">
      <span className="text-6xl w-28 flex justify-center items-center h-28 bg-gray-100 rounded-full uppercase">
        {initials}
      </span>
      <div className="h-full">
        <h1 className="text-xl font-semibold">
          {firstName} {lastName}
        </h1>
        <p className="text-sm">{email}</p>
      </div>
    </div>
  );
}
