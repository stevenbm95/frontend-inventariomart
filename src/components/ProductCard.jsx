import React from "react";
import useUserStore from "../store/userStore";
import useCartStore from "../store/cartStore";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();


  return (
    <div className="card bg-base-200 shadow p-4">
      <h2 className="font-bold">
        {product.name} {product.unit} - {product.stock}
      </h2>

      {user?.role === "ADMIN" && (
        <p className="text-primary font-semibold">${product.purchasePrice}</p>
      )}
      <p className="text-primary font-semibold">${product.salePrice}</p>
      <button
        onClick={() => addToCart(product)}
        // onClick={() => console.log(product)}
        className="btn btn-primary btn-sm mt-2"
      >
        Agregar al pedido
      </button>
    </div>
  );
};

export default ProductCard;
