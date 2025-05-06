import axiosInstance from '../axios'; // ajusta el path según dónde esté tu archivo

export const createOrder = async (orderData) => {
  try {
    const response = await axiosInstance.post('/orders', orderData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'No se pudo crear el pedido';
    throw new Error(message);
  }
};