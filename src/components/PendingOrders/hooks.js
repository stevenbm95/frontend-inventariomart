import { useEffect, useState } from "react";
import usePendingOrdersStore from "../store/pendingOrdersStore";
import useConfirmModalStore from "../store/confirmModalStore";
import { transformOrders, filterOrders } from "../utils/orderHelpers";

const usePendingOrdersLogic = () => {
  const openModal = useConfirmModalStore((state) => state.openModal);
  const {
    orders,
    fetchOrders,
    fetchOrdersByStatus,
    payOrder,
    cancelOrder,
    updateOrderItemQuantity,
  } = usePendingOrdersStore();

  const [searchUser, setSearchUser] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [editingItems, setEditingItems] = useState({});
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (statusFilter === "") return;
      if (statusFilter === "paid") return await fetchOrdersByStatus("paid");
      if (statusFilter === "pending")
        return await fetchOrdersByStatus("pending");
      if (statusFilter === "all") return await fetchOrders();
    };
    fetchData();
  }, [statusFilter]);

  const enableEdit = (orderId, itemId, currentQuantity) => {
    setEditingItems((prev) => ({ ...prev, [`${orderId}-${itemId}`]: true }));
    setQuantities((prev) => ({ ...prev, [`${orderId}-${itemId}`]: currentQuantity }));
  };

  const cancelEdit = (orderId, itemId) => {
    setEditingItems((prev) => ({ ...prev, [`${orderId}-${itemId}`]: false }));
  };

  const saveEdit = async (orderId, itemId) => {
    const quantity = quantities[`${orderId}-${itemId}`];
    if (quantity && quantity > 0) {
      await updateOrderItemQuantity(itemId, quantity);
      statusFilter === "all" ? await fetchOrders() : await fetchOrdersByStatus(statusFilter || "pending");
      cancelEdit(orderId, itemId);
    }
  };

  const handleQuantityChange = (orderId, itemId, value) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      setQuantities((prev) => ({ ...prev, [`${orderId}-${itemId}`]: numValue }));
    }
  };

  const handleClick = (id) => {
    openModal({
      message: "¿Confirmación de pago?",
      onConfirm: async () => {
        await payOrder(id);
        setStatusFilter("pending");
        statusFilter === "all" ? await fetchOrders() : await fetchOrdersByStatus(statusFilter || "pending");
      },
    });
  };

  const handleCancel = (id) => {
    openModal({
      message: "¿Cancelar esta orden? Esta acción no se puede deshacer.",
      onConfirm: () => cancelOrder(id),
    });
  };

  const filtredOrders = filterOrders(orders, searchUser, statusFilter);
  const items = transformOrders(filtredOrders);
  const totalOrderFiltred = filtredOrders.reduce((total, item) => total + item.totalAmount, 0);

  return {
    searchUser,
    setSearchUser,
    statusFilter,
    setStatusFilter,
    openIndex,
    setOpenIndex,
    editingItems,
    quantities,
    enableEdit,
    cancelEdit,
    saveEdit,
    handleQuantityChange,
    handleClick,
    handleCancel,
    items,
    totalOrderFiltred,
  };
};

export default usePendingOrdersLogic;
