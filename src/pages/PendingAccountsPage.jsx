
import React, { useEffect } from "react";
import PendingAccountsTable from "../components/PendingAccountsTable";
import usePendingAccountsStore from "../store/pendingAccountsStore";

const PendingAccountsPage = () => {
  const { fetchAccountsByStatus } = usePendingAccountsStore();

  useEffect(() => {
    const fetchData = async () => {
      await fetchAccountsByStatus("pending");
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="max-w-2xl mx-auto p-4">
      <PendingAccountsTable
        handleViewDetails={() => console.log("View Details")}
      />
    </div>
  );
};

export default PendingAccountsPage;
