import { useEffect, useState } from "react";
import { navigate, useQueryParams } from "raviger";
import { getProductsBySubCatId } from "../services/cat_subcat_service";

type Product = {
  pname: string;
  name: string;
  color: string;
  price: number;
  qty: number;
  [key: string]: unknown;
};

type ViewMode = "grid" | "list";

export default function Products() {
  const [queryParams] = useQueryParams((query) =>
    Object.fromEntries(new URLSearchParams(query)),
  );
  const subCatId = queryParams.subCatId ?? null;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(Boolean(subCatId));
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [cartCount, setCartCount] = useState(() => {
    try {
      const savedCart: Product[] = JSON.parse(localStorage.getItem("cart") ?? "[]");
      return savedCart.length;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    if (!subCatId) {
      setProducts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    getProductsBySubCatId(subCatId)
      .then((response) => setProducts(response.data))
      .catch(() => setError("Unable to load products."))
      .finally(() => setLoading(false));
  }, [subCatId]);

  const viewDetails = (product: Product) => {
    navigate(`/product-details?product=${encodeURIComponent(JSON.stringify(product))}`);
  };

  const addToCart = (product: Product) => {
    try {
      const savedCart: Product[] = JSON.parse(localStorage.getItem("cart") ?? "[]");
      const updatedCart = [...savedCart, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartCount(updatedCart.length);
    } catch {
      localStorage.setItem("cart", JSON.stringify([product]));
      setCartCount(1);
    }

    viewDetails(product);
  };

  return (
    <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <p className="mb-1 text-sm font-medium uppercase tracking-wider text-emerald-700">
            {subCatId ? `Collection ${subCatId}` : "Browse"}
          </p>
          <h1 className="text-3xl font-semibold text-stone-900">Products</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="inline-flex rounded-md border border-stone-300 bg-white p-1" aria-label="Product layout">
            {(["grid", "list"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                aria-pressed={viewMode === mode}
                onClick={() => setViewMode(mode)}
                className={`rounded px-3 py-1.5 text-sm font-medium capitalize transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${
                  viewMode === mode
                    ? "bg-stone-900 text-white"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
          <div className="rounded-md bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-900" aria-live="polite">
            Cart <span className="ml-1 tabular-nums">{cartCount}</span>
          </div>
        </div>
      </div>

      {loading && <p className="py-12 text-center text-stone-600">Loading products...</p>}
      {error && <p role="alert" className="py-12 text-center text-red-700">{error}</p>}
      {!loading && !error && products.length === 0 && (
        <p className="py-12 text-center text-stone-600">
          {subCatId ? "No products found." : "Choose a subcategory to browse products."}
        </p>
      )}
      {!loading && !error && products.length > 0 && (
        <div className={viewMode === "grid" ? "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "flex flex-col gap-4"}>
          {products.map((product, index) => (
            <article
              key={`${product.pname}-${index}`}
              className={`overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-md ${
                viewMode === "list" ? "flex flex-col sm:flex-row" : "flex flex-col"
              }`}
            >
              <div className={`flex items-center justify-center bg-stone-100 ${viewMode === "list" ? "min-h-36 sm:w-48 sm:shrink-0" : "h-48"}`}>
                <span className="rounded-full border border-white/80 bg-white/80 px-4 py-2 text-sm font-medium text-stone-700 shadow-sm">
                  {product.color || "Product"}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-stone-900">{product.pname}</h2>
                  <p className="mt-1 text-sm text-stone-600">Color: {product.color}</p>
                  <p className="mt-4 text-2xl font-semibold tabular-nums text-stone-900">
                    {new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(product.price)}
                  </p>
                  <p className={`mt-2 text-sm ${product.qty > 0 ? "text-stone-500" : "font-medium text-red-700"}`}>
                    {product.qty > 0 ? `${product.qty} available` : "Out of stock"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => viewDetails(product)}
                  className="mt-5 w-full rounded-md border border-stone-300 px-4 py-2.5 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                >
                  More details
                </button>
                <button
                  type="button"
                  disabled={product.qty <= 0}
                  onClick={() => addToCart(product)}
                  className="mt-5 w-full rounded-md bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:cursor-not-allowed disabled:bg-stone-300"
                >
                  {product.qty > 0 ? "Add to cart" : "Out of stock"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
