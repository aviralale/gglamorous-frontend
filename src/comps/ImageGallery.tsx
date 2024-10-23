import { useState } from "react";
import { Image } from "@/types/types";

interface ImageGalleryProps {
  images: Image[];
  productName: string;
}

export const ImageGallery = ({ images, productName }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(images[0]?.image);

  return (
    <div className="w-full">
      <div className="aspect-square w-full overflow-hidden rounded-lg">
        <img
          src={selectedImage}
          alt={productName}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="mt-4 flex gap-4">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(image.image)}
            className={`relative h-16 w-16 overflow-hidden rounded-md ${
              selectedImage === image.image ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <img
              src={image.image}
              alt={image.alt_text || productName}
              className="h-full w-full object-cover object-center"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
