
import React, { useEffect } from "react";
import PendingOrdersTable from "../components/PendingOrders/PendingOrdersTable";
import usePendingOrdersStore from "../store/pendingOrdersStore";

const PendingOrdersPage = () => {
  const { fetchOrdersByStatus } = usePendingOrdersStore();

  useEffect(() => {
    const fetchData = async () => {
      await fetchOrdersByStatus("pending");
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="max-w-2xl mx-auto p-4">
      <PendingOrdersTable
        handleViewDetails={() => console.log("View Details")}
      />
    </div>
  );
};

export default PendingOrdersPage;
