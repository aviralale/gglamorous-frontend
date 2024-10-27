import { Link } from "react-router-dom";

interface DisplayCardProps {
  image: string;
}

export default function DisplayCard({ image }: DisplayCardProps) {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
      }}
      className="w-full h-[70vh] bg-cover bg-center "
    >
      <div className="w-full h-full flex flex-col justify-center items-center bg-black/50 text-white">
        <h1 className="text-5xl font-semibold uppercase ">NEW ARRIVALS</h1>
        <Link to="/" className="uppercase underline text-lg">
          Shop Now
        </Link>
      </div>
    </div>
  );
}
