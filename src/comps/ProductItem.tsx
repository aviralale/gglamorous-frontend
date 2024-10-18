import React, { useState } from "react";
import { Product } from "../types/types";
import { useCart } from "@/contexts/CartContext";

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product.id, selectedSize, quantity)
      .then(() => {
        alert("Product added to cart");
        setSelectedSize("");
        setQuantity(1);
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="product-item">
      <h3>{product.name}</h3>
      <div className="product-image-gallery">
        <button onClick={prevImage}>&lt;</button>
        <img
          src={product.images[currentImageIndex]?.image}
          alt={product.images[currentImageIndex]?.alt_text || product.name}
        />
        <button onClick={nextImage}>&gt;</button>
      </div>
      <p>Price: ${product.is_sale ? product.sale_price : product.price}</p>
      <p>Description: {product.description}</p>
      <p>Fabric and Care: {product.fabric_and_care}</p>
      <div className="color-options">
        {Object.entries(product.colors).map(([colorName, colorCode]) => (
          <div
            key={colorName}
            style={{
              backgroundColor: colorCode,
              width: "20px",
              height: "20px",
              display: "inline-block",
              margin: "0 5px",
              border: "1px solid black",
            }}
            title={colorName}
          />
        ))}
      </div>
      <select
        value={selectedSize}
        onChange={(e) => setSelectedSize(e.target.value)}
      >
        <option value="">Select size</option>
        {Object.entries(product.sizes).map(([size, stock]) => (
          <option key={size} value={size} disabled={stock === 0}>
            {size} {stock === 0 ? "(Out of stock)" : ""}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        min={1}
        max={product.stock}
      />
      <button
        onClick={handleAddToCart}
        disabled={!selectedSize || quantity < 1}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;
