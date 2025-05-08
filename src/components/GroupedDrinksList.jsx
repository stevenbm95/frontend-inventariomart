import React, { useEffect, useMemo, useState } from "react";
import useDrinkStore from "../store/drinkStore";
import { CircleCheck } from "lucide-react";
import { toast } from "react-toastify";

const GroupedDrinksList = ({ handleEditStock }) => {
  const { fetchDrinks } = useDrinkStore();
  const [openIndex, setOpenIndex] = useState(null);
  const [addedItems, setAddedItems] = useState([]);

  useEffect(() => {
    fetchDrinks();
  }, []);
  const drinks = useDrinkStore((state) => state.drinks);
  const getGroupedDrinks = useDrinkStore.getState().getGroupedDrinks;

  const handleCheck = (variant) => {
    handleEditStock(variant);
    if (!addedItems.includes(variant.id)) {
      setAddedItems([...addedItems, variant.id]);
      toast.success(`Agregado una ${variant.name} en ${variant.unit}`);
    } else {
      toast.info(`Agregado una ${variant.name} en ${variant.unit}`);
    }
  };

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
                            <CircleCheck
                              className={`text-${
                                addedItems.includes(variant.id)
                                  ? "green-500"
                                  : "primary"
                              } hover:cursor-pointer active:scale-90 transition duration-150`}
                              size={20}
                              onClick={() => handleCheck(variant)}
                            />
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
