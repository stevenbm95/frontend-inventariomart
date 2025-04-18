import React, { useState } from "react";
import useDrinkStore from "../store/drinkStore";
import GroupedDrinksList from "../components/GroupedDrinksList"; // Importar el nuevo componente

const AdminPage = () => {
  const { fetchDrinks, addDrink, updateDrinkStock } =
    useDrinkStore();
  const [newProduct, setNewProduct] = useState({ name: "", stock: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: name === "stock" ? Number(value) : value,
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newProduct.name || newProduct.stock < 0) return;
    await addDrink(newProduct);
    setNewProduct({ name: "", stock: 0 });
    fetchDrinks();
  };

  // const handleDelete = async (id) => {
  //   await removeDrink(id);
  //   fetchDrinks();
  // };

  const handleEditStock = async (drink) => {
    const newStock = prompt(`Nuevo stock para "${drink.name}"`, drink.stock);
    if (newStock !== null && !isNaN(newStock)) {
      await updateDrinkStock(drink.id, Number(newStock));
      fetchDrinks();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Admin de Bebidas</h1>

      {/* Formulario DaisyUI */}
      <form
        onSubmit={handleAdd}
        className="flex flex-col sm:flex-row gap-2 mb-6"
      >
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          className="input input-bordered w-full"
          value={newProduct.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          className="input input-bordered w-24"
          value={newProduct.stock}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-success">
          Crear
        </button>
      </form>

      {/* Usar el componente GroupedDrinksList */}
      <GroupedDrinksList handleEditStock={handleEditStock} text={'Agregar'} />

    </div>
  );
};

export default AdminPage;
