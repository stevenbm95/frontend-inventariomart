import React, { useState, useEffect } from "react";
import usePendingOrdersStore from "../../store/pendingOrdersStore";
import useUserStore from "../../store/userStore";
import useConfirmModalStore from "../../store/confirmModalStore";
// import { formatPrice } from "../../utils/formatPrice";
// import { formatDate } from "../../utils/formatDate";
import OrderFilters from "./OrderFilters";
import OrderCollapse from "./OrderCollapse";

const PendingOrdersTable = () => {
  const { users, fetchUsers } = useUserStore();
  const openModal = useConfirmModalStore((state) => state.openModal);
  const {
    orders,
    payOrder,
    fetchOrdersByStatus,
    fetchOrders,
    cancelOrder,
    updateOrderItemQuantity,
  } = usePendingOrdersStore();

  const [openIndex, setOpenIndex] = useState(null);
  const [editingItems, setEditingItems] = useState({});
  const [quantities, setQuantities] = useState({});
  const [searchUser, setSearchUser] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!statusFilter) return;
      if (statusFilter === "all") return await fetchOrders();
      await fetchOrdersByStatus(statusFilter);
    };
    fetchData();
  }, [statusFilter]);

  const filtredOrders = orders.filter((order) => {
    const userMatch = order.user.name.toLowerCase().includes(searchUser.toLowerCase());
    const statusMatch = statusFilter === "" || statusFilter === "all" || order.status === statusFilter;
    return userMatch && statusMatch;
  });

  const totalOrderFiltred = filtredOrders.reduce(
    (total, item) => total + item.totalAmount,
    0
  );

  const handlePay = (id) => {
    openModal({
      message: "¿Confirmación de pago?",
      onConfirm: async () => {
        await payOrder(id);
        await (statusFilter === "all" ? fetchOrders() : fetchOrdersByStatus(statusFilter));
      },
    });
  };

  const handleCancel = (id) => {
    openModal({
      message: "¿Cancelar esta orden? Esta acción no se puede deshacer.",
      onConfirm: () => cancelOrder(id),
    });
  };

  return (
    <div>
      <OrderFilters users={users} setSearchUser={setSearchUser} setStatusFilter={setStatusFilter} total={totalOrderFiltred} />
      {filtredOrders.map((order, index) => (
        <OrderCollapse
          key={order.id}
          order={order}
          index={index}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
          editingItems={editingItems}
          setEditingItems={setEditingItems}
          quantities={quantities}
          setQuantities={setQuantities}
          handlePay={() => handlePay(order.id)}
          handleCancel={() => handleCancel(order.id)}
          updateOrderItemQuantity={updateOrderItemQuantity}
          refreshOrders={() =>
            statusFilter === "all" ? fetchOrders() : fetchOrdersByStatus(statusFilter || "pending")
          }
        />
      ))}
    </div>
  );
};

export default PendingOrdersTable;


// import React, { useState, useEffect } from "react";
// import usePendingOrdersStore from "../../store/pendingOrdersStore"; // Importamos el store de pendingOrders
// import { formatPrice } from "../../utils/formatPrice";
// import { formatDate } from "../../utils/formatDate";
// import useUserStore from "../../store/userStore";
// import useConfirmModalStore from "../../store/confirmModalStore";
// import ControlQuantity from "../ControlQuantity"; // Reutilizamos tu componente existente
// import { FiEdit, FiCheck, FiX } from "react-icons/fi"; // Importamos el icono de edición

// const PendingOrdersTable = () => {
//   const { users, fetchUsers } = useUserStore();
//   const openModal = useConfirmModalStore((state) => state.openModal);
//   const {
//     orders,
//     payOrder,
//     fetchOrdersByStatus,
//     fetchOrders,
//     cancelOrder,
//     updateOrderItemQuantity,
//   } = usePendingOrdersStore();

//   const [openIndex, setOpenIndex] = useState(null);
//   const [editingItems, setEditingItems] = useState({});
//   const [quantities, setQuantities] = useState({});
//   const [searchUser, setSearchUser] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");

//   useEffect(() => {
//     fetchUsers();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (statusFilter === "") return;
//       if (statusFilter === "paid") return await fetchOrdersByStatus("paid");
//       if (statusFilter === "pending")
//         return await fetchOrdersByStatus("pending");
//       if (statusFilter === "all") return await fetchOrders();
//       await fetchOrdersByStatus, statusFilter;
//     };

//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [statusFilter]);

//   const enableEdit = (orderId, itemId, currentQuantity) => {
//     setEditingItems((prev) => ({
//       ...prev,
//       [`${orderId}-${itemId}`]: true,
//     }));
//     setQuantities((prev) => ({
//       ...prev,
//       [`${orderId}-${itemId}`]: currentQuantity,
//     }));
//   };

//   const cancelEdit = (orderId, itemId) => {
//     setEditingItems((prev) => ({
//       ...prev,
//       [`${orderId}-${itemId}`]: false,
//     }));
//   };

//   const saveEdit = async (orderId, itemId) => {
//     console.log("saveEdit", "Order Id" + orderId, "Item Id" + itemId);
//     try {
//       const quantity = quantities[`${orderId}-${itemId}`];
//       if (quantity && quantity > 0) {
//         console.log("quantity", quantity);
//         console.log("itemId", itemId);

//         await updateOrderItemQuantity(itemId, quantity);

//         // Refrescar los datos según el filtro actual
//         if (statusFilter === "all") {
//           await fetchOrders();
//         } else {
//           await fetchOrdersByStatus(statusFilter || "pending");
//         }

//         cancelEdit(orderId, itemId);
//       }
//     } catch (error) {
//       console.error("Error updating quantity:", error);
//     }
//   };

//   const handleQuantityChange = (orderId, itemId, value) => {
//     const numValue = parseInt(value, 10);
//     if (!isNaN(numValue)) {
//       setQuantities((prev) => ({
//         ...prev,
//         [`${orderId}-${itemId}`]: numValue,
//       }));
//     }
//   };

//   // Función para actualizar cantidad
//   const handleUpdateQuantity = async (orderItemId, newQuantity) => {
//     try {
//       await updateOrderItemQuantity(orderItemId, newQuantity);
//       // Refrescar los datos según el filtro actual
//       if (statusFilter === "all") {
//         await fetchOrders();
//       } else {
//         await fetchOrdersByStatus(statusFilter || "pending");
//       }
//     } catch (error) {
//       console.error("Error updating quantity:", error);
//     }
//   };

//   const filtredOrders = orders.filter((order) => {
//     const userMatch = order.user.name
//       .toLowerCase()
//       .includes(searchUser.toLowerCase());
//     const statusMatch =
//       statusFilter === "all" || statusFilter === ""
//         ? true
//         : order.status === statusFilter;

//     return userMatch && statusMatch;
//   });

//   const items = filtredOrders.map((order) => {
//     return {
//       id: order.id,
//       user: order.user.name,
//       total: order.totalAmount,
//       status: order.status,
//       consumption: order.orderItems.map((item) => {
//         return {
//           id: item.id,
//           idDrink: item.drinkId,
//           nameDrink: item.drink.name,
//           unit: item.drink.unit,
//           quantity: item.quantity,
//           salePrice: item.drink.salePrice,
//           price: item.drink.salePrice,
//           total: item.drink.salePrice * item.quantity,
//         };
//       }),
//       createdAt: order.createdAt,
//     };
//   });

//   const totalOrderFiltred = filtredOrders.reduce(
//     (total, item) => total + item.totalAmount,
//     0
//   );

//   const handleClick = (id) => {
//     openModal({
//       message: "¿Confirmación de pago?",
//       onConfirm: async () => {
//         payOrder(id);
//         setStatusFilter("pending");
//         if (statusFilter === "all") {
//           await fetchOrders();
//         } else {
//           await fetchOrdersByStatus(statusFilter || "pending");
//         }
//       },
//     });
//   };

//   const handleCancel = (id) => {
//     openModal({
//       message: "¿Cancelar esta orden? Esta acción no se puede deshacer.",
//       onConfirm: () => {
//         cancelOrder(id);
//       },
//     });
//   };

//   return (
//     <div>
//       <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center">
//         <div className="flex gap-2 md:w-2/3">
//           <select
//             onChange={(e) => setSearchUser(e.target.value)}
//             className="select select-md ml-2"
//           >
//             <option value="">Cliente</option>
//             {users
//               .filter((u) => u.role === "USER")
//               .map((u) => (
//                 <option key={u.id} value={u.name}>
//                   {u.name}
//                 </option>
//               ))}
//           </select>
//           <select
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="select select-md ml-2"
//           >
//             <option value="">Estado</option>
//             <option value="pending">Pendiente</option>
//             <option value="paid">Pagado</option>
//             <option value="all">Todos</option>
//           </select>
//         </div>
//         <span className="text-center text-xl mt-1 font-bold">
//           Total: {formatPrice(totalOrderFiltred)}
//         </span>
//       </div>
//       {items.map((item, index) => (
//         <div key={item.id} className="mb-4">
//           <div className="collapse collapse-arrow bg-base-200">
//             <input
//               type="checkbox"
//               checked={openIndex === index}
//               onChange={() => setOpenIndex(openIndex === index ? null : index)}
//             />
//             <div className="collapse-title text-lg font-medium flex justify-between items-center">
//               <span>{item.user}</span>
//               <span>{formatDate(item.createdAt)}</span>
//               <span className="">{formatPrice(item.total)}</span>
//             </div>
//             <div className="collapse-content">
//               <table className="table w-full text-sm">
//                 <thead>
//                   <tr>
//                     <th className="px-2 py-1">Consumo</th>
//                     <th className="px-2 py-1 text-center">Cantidad</th>
//                     <th className="px-2 py-1 text-right">Valores</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {item.consumption.map(
//                     ({ id, nameDrink, unit, quantity, price, total }) => {
//                       console.log("item", item);
//                       console.log("id", id);
//                       const isEditing = editingItems[`${item.id}-${id}`];
//                       return (
//                         <tr key={id}>
//                           <td className="flex flex-col">
//                             <span className="text-xs">{nameDrink}</span>
//                             <span className="text-sm capitalize font-bold">
//                               {unit}
//                             </span>
//                           </td>
//                           <td>
//                             {item.status === "pending" ? (
//                               isEditing ? (
//                                 <div className="flex flex-col items-center space-y-1">
//                                   <div className="flex items-center justify-center">
//                                     <button
//                                       className="btn btn-xs tn-ghost px-1"
//                                       onClick={() =>
//                                         handleQuantityChange(
//                                           item.id,
//                                           id,
//                                           (quantities[`${item.id}-${id}`] ||
//                                             quantity) - 1
//                                         )
//                                       }
//                                       disabled={
//                                         (quantities[`${item.id}-${id}`] ||
//                                           quantity) <= 1
//                                       }
//                                     >
//                                       -
//                                     </button>
//                                     <input
//                                       type="number"
//                                       min="1"
//                                       value={
//                                         quantities[`${item.id}-${id}`] ||
//                                         quantity
//                                       }
//                                       onChange={(e) =>
//                                         handleQuantityChange(
//                                           item.id,
//                                           id,
//                                           e.target.value
//                                         )
//                                       }
//                                       className="input input-xs w-12 text-center mx-1"
//                                     />
//                                     <button
//                                       className="btn btn-xs btn-ghost px-1"
//                                       onClick={() =>
//                                         handleQuantityChange(
//                                           item.id,
//                                           id,
//                                           (quantities[`${item.id}-${id}`] ||
//                                             quantity) + 1
//                                         )
//                                       }
//                                     >
//                                       +
//                                     </button>
//                                   </div>
//                                   <div className="flex justify-center space-x-1 mt-1">
//                                     <button
//                                       onClick={() => saveEdit(item.id, id)}
//                                       className="btn btn-xs btn-success px-2"
//                                     >
//                                       <FiCheck size={14} />
//                                     </button>
//                                     <button
//                                       onClick={() => cancelEdit(item.id, id)}
//                                       className="btn btn-xs btn-error px-2"
//                                     >
//                                       <FiX size={14} />
//                                     </button>
//                                   </div>
//                                 </div>
//                               ) : (
//                                 <div className="flex justify-center items-center">
//                                   <span>{quantity}</span>
//                                   <button onClick={() => enableEdit(item.id, id, quantity) }
//                                           className="btn btn-xs btn-ghost mt-1"
//                                   >
//                                     <FiEdit size={14} />
//                                   </button>
//                                 </div>
//                               )
//                             ) : (
//                               quantity
//                             )}
//                           </td>
//                           <td className="px-2 py-1 text-right">
//                             <div className="flex flex-col">
//                               <span className="text-xs">
//                                 {formatPrice(price)}
//                               </span>
//                               <span className="text-xs font-semibold">
//                                 {formatPrice(total)}
//                               </span>
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     }
//                   )}
//                   <tr>
//                     <td className="text-center" colSpan="3">
//                       {item.status === "pending" ? (
//                         <div className="flex justify-center gap-2">
//                           <button
//                             className="btn btn-sm text-sm btn-info"
//                             onClick={() => handleClick(item.id)}
//                           >
//                             Pagar
//                           </button>
//                           <button
//                             className="btn btn-sm text-sm btn-error"
//                             onClick={() => handleCancel(item.id)}
//                           >
//                             Cancelar
//                           </button>
//                         </div>
//                       ) : item.status === "paid" ? (
//                         <span className="bg-green-700 rounded-full text-white text-xs px-2 py-1">
//                           Pagado
//                         </span>
//                       ) : (
//                         <span className="bg-red-700 rounded-full text-white text-xs px-2 py-1">
//                           Cancelado
//                         </span>
//                       )}
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PendingOrdersTable;


