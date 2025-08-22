import React from "react";
import Link from "next/link";

const Card = ({ product }) => {
  return (
    <div className="card bg-base-100 max-w-sm shadow-sm">
      <figure>
        <img
          src={product.img}
          alt={product.name}
          className="object-cover w-full h-64"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description.length > 100 
            ? product.description.slice(0, 100) + "..." 
            : product.description}
        </p>
        <div className="card-actions justify-between">
            <p className="text-xl font-bold">${product.price}</p>
          {product._id ? (
            <Link href={`/products/${product._id}`} className="btn btn-primary">
              View Details
            </Link>
          ) : (
            <button className="btn btn-primary">View Details</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
