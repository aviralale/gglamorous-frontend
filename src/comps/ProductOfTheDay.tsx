import { Link } from "react-router-dom";

interface ProductOfTheDayProps {
  image: string;
}

export default function ProductOfTheDay({ image }: ProductOfTheDayProps) {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
      }}
      className="w-full h-[70vh] bg-cover bg-center "
    >
      <div className="w-full h-full flex flex-col justify-center pl-32 bg-black/50 text-white">
        <h1 className="text-4xl font-semibold uppercase ">
          Product of the day
        </h1>
        <h1 className="text-6xl font-semibold uppercase ">
          Light Blue Lace Mini Dress with Keyhole Neckline
        </h1>
        <Link to="/" className="uppercase underline text-lg">
          Shop Now
        </Link>
      </div>
    </div>
  );
}
