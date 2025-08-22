"use client";

import { useState } from "react";

export default function AddProductPage() {
    const [form, setForm] = useState({
        img: "",
        name: "",
        price: "",
        description: "",
    });

    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
            });

            const data = await res.json();
            if (data.success) {
            alert("✅ Product added successfully!");
            setForm({ img: "", name: "", price: "", description: "" });
            } else {
            alert("❌ Failed to add product: " + data.error);
            }
        } catch (err) {
            console.error(err);
            alert("❌ Something went wrong!");
        }
    };


  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Add Product</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Image URL */}
          <input
            type="text"
            name="img"
            value={form.img}
            onChange={handleChange}
            placeholder="Image URL"
            className="input input-bordered w-full"
            required
          />

          {/* Name */}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="input input-bordered w-full"
            required
          />

          {/* Price */}
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="input input-bordered w-full"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Product Description"
            className="textarea textarea-bordered w-full"
            rows="3"
            required
          ></textarea>

          <button type="submit" className="btn btn-neutral mt-2">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
