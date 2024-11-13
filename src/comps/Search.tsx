import React, { useState, useCallback } from "react";
import { CrossIcon, SearchIcon } from "@/assets/Icons";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader } from "lucide-react";
import { productApi } from "@/services/productApi";
import { Product, SearchParams } from "@/types/types";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleSearch = async (query: string): Promise<void> => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchParams: SearchParams = {
      q: query,
      page: 1,
      per_page: 12,
    };

    try {
      setLoading(true);
      setError(null);

      const response = await productApi.search(searchParams);
      // Handle different response structures
      if (Array.isArray(response)) {
        setResults(response);
      } else if (response.data && Array.isArray(response.data)) {
        setResults(response.data);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error("Search error:", err);
      toast.error("Error while searching");
    } finally {
      setLoading(false);
    }
  };

  const debounce = <T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedSearch = useCallback(
    debounce((query: string) => handleSearch(query), 300),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <Link
      to={`/products/${product.slug}`}
      className="border flex gap-2  p-4 hover:shadow-lg transition-shadow"
      onClick={() => setOpen(false)} // Close drawer when clicking a product
    >
      {product.images?.[0] && (
        <img
          src={product.images[0].image}
          alt={product.name}
          className="w-24 h-24 object-cover rounded-md"
        />
      )}
      <div>
        <h3 className="mt-2 text-sm font-semibold">{product.name}</h3>
        <p className="text-muted-foreground text-xs mt-1">
          {product.category?.name}
        </p>
        <p className="font-medium mt-2 text-xs">NPR {product.price}</p>
        {product.is_sale && (
          <span className="bg-red-100 text-red-800 text-xs px-1 rounded-full mt-2 inline-block">
            On Sale
          </span>
        )}
      </div>
    </Link>
  );

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="w-full  h-auto sm:w-auto uppercase text-muted-foreground flex gap-2">
        <SearchIcon className="text-black size-6" /> Search
      </DrawerTrigger>
      <DrawerContent>
        <div className="p-16">
          <form onSubmit={handleSubmit} className="relative">
            <div className="border-b border-b-black flex gap-4">
              <SearchIcon className="size-10" />
              <input
                type="text"
                className="text-2xl outline-none uppercase w-full"
                placeholder="search"
                value={searchQuery}
                onChange={handleInputChange}
                autoFocus
              />
              <DrawerClose>
                <button type="button">
                  <CrossIcon />
                </button>
              </DrawerClose>
            </div>
          </form>

          <div className="mt-8">
            {/* Debug information */}
            <div className="text-sm text-gray-500 mb-2">
              Search query: {searchQuery}
              <br />
              Results count: {results?.length || 0}
            </div>

            {loading && (
              <div className="flex justify-center py-8">
                <Loader className="animate-spin size-8 text-gray-500" />
              </div>
            )}

            {error && (
              <Alert variant="destructive" className="my-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {!loading && !error && results && results.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
                {results.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {!loading &&
              !error &&
              searchQuery &&
              (!results || results.length === 0) && (
                <div className="text-center py-8 text-muted-foreground">
                  No products found matching "{searchQuery}"
                </div>
              )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Search;
