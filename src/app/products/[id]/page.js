"use client"; // client-side fetching

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

const ProductDetailsPage = () => {
  const { id } = useParams(); // get dynamic id from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://scic-app-backend.vercel.app/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center p-10">Loading product...</p>;
  if (!product) return <p className="text-center p-10">Product not found</p>;

  return (
    <div className="w-[90vw] mx-auto my-8">
      <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
      <Image
        src={product.img}
        alt={product.name}
        className="w-full max-w-md h-auto mb-4"
      />
      <p className="text-xl font-semibold mb-2">Price: ${product.price}</p>
      <p className="mb-4">{product.description}</p>
      <button className="btn btn-primary">Buy Now</button>
    </div>
  );
};

export default ProductDetailsPage;
