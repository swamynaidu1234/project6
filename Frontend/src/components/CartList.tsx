import { useState } from "react";
import { navigate } from "raviger";

type CartItem = {
  pname: string;
  name: string;
  color: string;
  price: number;
  qty: number;
  cartQuantity?: number;
  [key: string]: unknown;
};

export type { CartItem };

const getProductKey = (product: CartItem) =>
  String(product.id ?? product.productId ?? `${product.pname ?? product.name}-${product.color}-${product.price}`);

const readCart = (): CartItem[] => {
    const savedCart = JSON.parse(localStorage.getItem("cart") ?? "[]") as CartItem[];
    return savedCart;
};

export default function CartList() {
  const [items, setItems] = useState<CartItem[]>(readCart);
  const itemCount = items.reduce((count, item) => count + (item.cartQuantity ?? 1), 0);
    console.log(items)
  const changeQuantity = (product: CartItem, change: number) => {
    const updatedItems = items
      .map((item) =>
        getProductKey(item) === getProductKey(product)
          ? { ...item, cartQuantity: (item.cartQuantity ?? 1) + change }
          : item,
      )
      .filter((item) => (item.cartQuantity ?? 1) > 0);
    setItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  return (
    <main className="mx-auto min-h-[60vh] max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={() => navigate("/products")}
        className="mb-6 rounded-md border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
      >
        Continue shopping
      </button>
      <section aria-label="Shopping cart" className="border-t border-stone-200 py-6">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h1 className="text-2xl font-semibold text-stone-900">Your cart</h1>
          <p className="text-sm text-stone-600">{itemCount} items</p>
        </div>
        {items.length === 0 ? (
          <p className="py-8 text-sm text-stone-600">Your cart is empty.</p>
        ) : (
          <ul className="divide-y divide-stone-200">
            {items.map((item) => (
              <li key={getProductKey(item)} className="flex flex-wrap items-center justify-between gap-4 py-4">
                <div className="min-w-0">
                  <p className="font-medium text-stone-900">{item.pname ?? item.name}</p>
                  <p className="mt-1 text-sm text-stone-600">
                    {item.color} · {new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(item.price)} each
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label={`Decrease ${item.pname ?? item.name} quantity`}
                    onClick={() => changeQuantity(item, -1)}
                    className="grid size-9 place-items-center rounded-md border border-stone-300 text-lg font-semibold text-stone-700 hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                  >
                    −
                  </button>
                  <span className="min-w-6 text-center text-sm font-semibold tabular-nums" aria-label="Quantity">
                    {item.cartQuantity ?? 1}
                  </span>
                  <button
                    type="button"
                    aria-label={`Increase ${item.pname ?? item.name} quantity`}
                    disabled={(item.cartQuantity ?? 1) >= item.qty}
                    onClick={() => changeQuantity(item, 1)}
                    className="grid size-9 place-items-center rounded-md border border-stone-300 text-lg font-semibold text-stone-700 hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
