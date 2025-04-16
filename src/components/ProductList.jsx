import React, { useEffect } from 'react';
import useDrinkStore from '../store/drinkStore';
import ProductCard from './ProductCard';

const ProductList = () => {

  const {drinks, fetchDrinks } = useDrinkStore();

  
  useEffect(() => {
    fetchDrinks()
    .catch(err => console.error('Error al obtener productos:', err));
  }, [fetchDrinks]);


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {drinks.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        drinks.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
};

export default ProductList;