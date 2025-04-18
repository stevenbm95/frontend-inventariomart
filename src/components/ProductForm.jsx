// src/components/ProductForm.jsx
import React, { useState } from 'react';

const ProductForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ name: '', stock: 0, image: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'stock' ? Number(value) : value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: '', stock: 0, image: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow mb-6 space-y-4">
      <h2 className="text-xl font-semibold">Agregar producto</h2>
      <input 
        type="text" 
        name="name" 
        placeholder="Nombre del producto" 
        value={form.name} 
        onChange={handleChange} 
        className="w-full border px-3 py-2 rounded"
        required 
      />
      <input 
        type="number" 
        name="stock" 
        placeholder="Stock inicial" 
        value={form.stock} 
        onChange={handleChange} 
        className="w-full border px-3 py-2 rounded"
        required 
      />
      <input 
        type="text" 
        name="image" 
        placeholder="URL de la imagen" 
        value={form.image} 
        onChange={handleChange} 
        className="w-full border px-3 py-2 rounded"
      />
      <button type="submit" className="bg-green-500 text-white w-full py-2 rounded">
        Crear producto
      </button>
    </form>
  );
};

export default ProductForm;
