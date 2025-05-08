import React from 'react';

const AdminProductCard = ({ product, onDelete, onEditStock }) => {
  return (
    <div className="bg-white shadow rounded-xl p-4 flex flex-col gap-2">
      <img src={product.image || '/placeholder.jpg'} alt={product.name} className="w-full h-40 object-cover rounded-md" />
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-sm text-gray-600">Stock: {product.stock}</p>
      <div className="flex gap-2">
        <button 
          className="bg-blue-500 text-white px-2 py-1 rounded w-full"
          onClick={() => onEditStock(product)}
        >
          Editar Stock
        </button>
        <button 
          className="bg-red-500 text-white px-2 py-1 rounded w-full"
          onClick={() => onDelete(product.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default AdminProductCard;
