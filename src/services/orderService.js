import { toast } from 'react-toastify';
import axiosInstance from '../axios'; // ajusta el path según dónde esté tu archivo

export const createOrder = async (orderData) => {
  try {
    const response = await axiosInstance.post('/orders', orderData);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'No se pudo crear el pedido';
    toast.error(message);
    throw new Error(message);
  }
};