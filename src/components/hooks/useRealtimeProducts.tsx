// hooks/useRealtimeProducts.ts
import { useEffect, useState } from "react";
import { supabase } from "../supabase-client"; // your supabaseClient.ts file

export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
  liked: boolean;
  ecoScore: number;
}

export function useRealtimeProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  // Initial fetch
  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from("products").select("*");
      if (error) console.error("Fetch error:", error.message);
      else setProducts(data as Product[]);
    }
    fetchProducts();
  }, []);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel("products-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setProducts((prev) => [payload.new as Product, ...prev]);
          }
          if (payload.eventType === "UPDATE") {
            setProducts((prev) =>
              prev.map((p) => (p.id === payload.new.id ? (payload.new as Product) : p))
            );
          }
          if (payload.eventType === "DELETE") {
            setProducts((prev) => prev.filter((p) => p.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return products;
}
