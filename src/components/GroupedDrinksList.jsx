import React, { useEffect, useMemo, useState } from "react";
import useDrinkStore from "../store/drinkStore";

const GroupedDrinksList = ({ handleEditStock, text }) => {
  const { fetchDrinks } = useDrinkStore();
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetchDrinks();
  }, []);

  const drinks = useDrinkStore((state) => state.drinks);
  const getGroupedDrinks = useDrinkStore.getState().getGroupedDrinks;

  // Solo se calcula cuando cambia el arreglo de bebidas
  const groupedDrinks = useMemo(() => getGroupedDrinks(), [drinks]);

  return (
    <div>
      {groupedDrinks.length > 0 ? (
        groupedDrinks.map((drink, index) => (
          <div key={drink.name} className="mb-4">
            <div className="collapse collapse-arrow bg-base-200">
              <input
                type="checkbox"
                checked={openIndex === index}
                onChange={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
              <div className="collapse-title text-lg font-medium flex justify-between items-center">
                <span>{drink.name}</span>
                <span className="text-sm text-gray-500">
                  Total:{" "}
                  {drink.variants.reduce(
                    (total, variant) => total + variant.stock,
                    0
                  )}
                </span>
              </div>
              <div className="collapse-content">
                <table className="table w-full text-sm">
                  <thead>
                    <tr>
                      <th>Presentación</th>
                      <th>Stock</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {drink.variants.map((variant) => (
                      <tr key={variant.unit}>
                        <td>{variant.unit}</td>
                        <td>{variant.stock}</td>
                        <td className="space-x-2">
                          {handleEditStock && (
                            <button
                              className="btn btn-xs btn-info"
                              onClick={() => handleEditStock(variant)}
                            >
                              {text}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No hay productos disponibles.</p>
      )}
    </div>
  );
};

export default GroupedDrinksList;
