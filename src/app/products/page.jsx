"use client"; // enable client-side fetching

import React, { useEffect, useState } from "react";
import Card from "@/Components/Card";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://scic-app-backend.vercel.app/products"); // your Express API
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center p-10">Loading products...</p>;

  return (
    <div className="w-[90vw] mx-auto">
      <p className="text-3xl p-3 font-bold">All Products</p>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {products.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;