import { navigate, useQueryParams } from "raviger";

type Product = Record<string, unknown>;

export default function ProductDetails() {
  const [queryParams] = useQueryParams((query) =>
    Object.fromEntries(new URLSearchParams(query)),
  );

  let product: Product | null = null;
  try {
    product = JSON.parse(queryParams.product ?? "null") as Product | null;
  } catch {
    product = null;
  }

  const formatValue = (value: unknown) => {
    if (value == null || value === "") return "Not specified";
    if (typeof value === "object") return JSON.stringify(value, null, 2);
    return String(value);
  };

  return (
    <main className="mx-auto min-h-[60vh] max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={() => navigate("/products")}
        className="mb-6 rounded-md border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
      >
        Back to products
      </button>

      {!product ? (
        <section className="border-t border-stone-200 py-8">
          <h1 className="text-2xl font-semibold text-stone-900">Product details unavailable</h1>
          <p className="mt-2 text-stone-600">Return to the product list and select a product to view its details.</p>
        </section>
      ) : (
        <section className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm">
          <div className="bg-emerald-800 px-6 py-8 text-white sm:px-8">
            <p className="text-sm font-medium uppercase tracking-wider text-emerald-100">Product details</p>
            <h1 className="mt-2 break-words text-3xl font-semibold">
              {formatValue(product.pname ?? product.name)}
            </h1>
          </div>
          <dl className="grid gap-x-8 gap-y-5 p-6 sm:grid-cols-2 sm:p-8">
            {Object.entries(product).map(([field, value]) => (
              <div key={field} className="min-w-0 border-b border-stone-100 pb-4">
                <dt className="text-sm font-medium capitalize text-stone-500">{field}</dt>
                <dd className="mt-1 break-words text-base font-medium text-stone-900">
                  {formatValue(value)}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </main>
  );
}