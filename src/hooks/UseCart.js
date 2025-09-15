import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'cart_items';

export function useCart() {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const total = useMemo(
    () => items.reduce((sum, it) => sum + (it.price || 0) * (it.qty || 1), 0),
    [items]
  );

  const add = (product, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], qty: (updated[idx].qty || 1) + qty };
        return updated;
      }
      return [
        ...prev,
        { id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl, qty },
      ];
    });
  };

  const setQty = (productId, qty) =>
    setItems((prev) => prev.map((p) => (p.id === productId ? { ...p, qty: Math.max(1, qty) } : p)));

  const remove = (productId) => setItems((prev) => prev.filter((p) => p.id !== productId));
  const clear = () => setItems([]);

  return { items, total, add, setQty, remove, clear };
}
