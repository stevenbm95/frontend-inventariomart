import React, { useEffect, useState } from "react";
import useDrinkStore from "../store/drinkStore";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const { drinks, fetchDrinks } = useDrinkStore();

  const [groupedDrinks, setGroupedDrinks] = useState({});

  useEffect(() => {
    const loadDrinks = async () => {
      try {
        await fetchDrinks(); // esto actualiza el estado
        const grouped = useDrinkStore.getState().getGroupedDrinks(); // lo llamas desde el estado actualizado
        setGroupedDrinks(grouped);
      } catch (err) {
        console.error("Error al obtener productos:", err);
      }
    };

    loadDrinks();
  }, []);

  return (
    <div className="p-4 space-y-6">
      {Object.entries(groupedDrinks).map(([name, units]) => (
        <div key={name}>
          <h2 className="text-xl font-bold mb-2">{name}</h2>

          {Object.entries(units).map(([unit, products]) => (
            <div key={unit} className="mb-4">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                {unit}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Array.isArray(products) ? (
                  products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <p className="text-red-500">
                    Error: productos no es un array para unidad {unit}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
