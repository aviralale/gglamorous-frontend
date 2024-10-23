import { ImageGallery } from "@/comps/ImageGallery";
import { ProductDetails } from "@/comps/ProductDetail";
import { Product } from "@/types/types";
interface ProductPageProps {
  product: Product;
}

export const ProductPage = ({ product }: ProductPageProps) => {
  const handleAddToCart = (size: string, color: string) => {
    // Implement cart functionality
    console.log(
      `Added to cart: ${product.name} - Size: ${size}, Color: ${color}`
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ImageGallery images={product.images} productName={product.name} />
        <ProductDetails product={product} onAddToCart={handleAddToCart} />
      </div>
    </div>
  );
};
