"use client"; // required for client-side fetching

import Hero from "@/Components/Hero.jsx";
import Card from "@/Components/Card.jsx";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/products"); // your Express API
        const data = await res.json();
        setProducts(data.slice(0, 4)); // get only first 4 products
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Hero />
      <div className="w-[90vw] mx-auto mt-6">
        <p className="text-3xl font-bold mb-4">New Collections</p>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <Card key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

