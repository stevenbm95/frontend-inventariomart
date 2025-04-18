import React, { useState, useEffect } from "react";
import usePendingAccountsStore from "../store/pendingAccountsStore";
import { formatPrice } from "../utils/formatPrice";
import { formatDate } from "../utils/formatDate";
import useUserStore from "../store/userStore";
import useConfirmModalStore from "../store/confirmModalStore";

const PendingAccountsTable = ({ handleViewDetails }) => {
  const { users, fetchUsers } = useUserStore();
  const openModal = useConfirmModalStore((state) => state.openModal);
  const { accounts, payAcount, fetchAccountsByStatus, fetchAccounts } =
    usePendingAccountsStore();

  const [openIndex, setOpenIndex] = useState(null);

  const [searchUser, setSearchUser] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (statusFilter === "") return;
      if (statusFilter === "all") return await fetchAccounts();
      await fetchAccountsByStatus(statusFilter);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const filtredAccounts = accounts.filter((account) => {
    const userMatch = account.user.name
      .toLowerCase()
      .includes(searchUser.toLowerCase());
    const statusMatch =
      statusFilter === "all" || statusFilter === ""
        ? true
        : account.status === statusFilter;

    return userMatch && statusMatch;
  });

  const items = filtredAccounts.map((account) => {
    return {
      id: account.id,
      user: account.user.name,
      total: account.totalAmount,
      status: account.status,
      consumption: account.orderItems.map((item) => {
        return {
          id: item.drinkId,
          nameDrink: item.drink.name,
          unit: item.drink.unit,
          quantity: item.quantity,
          salePrice: item.drink.salePrice,
          price: item.drink.salePrice,
          total: item.drink.salePrice * item.quantity,
        };
      }),
      createdAt: account.createdAt,
    };
  });

  const totalAmountFiltred = filtredAccounts.reduce(
    (total, item) => total + item.totalAmount,
    0
  );

  const handleClick = (id) => {
    openModal({
      message: "¿Confirmación de pago?",
      onConfirm: () => {
        payAcount(id);
      },
    });
  };

  return (
    <div>
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center">
        <div className="flex gap-2 md:w-2/3">
          <select
            onChange={(e) => setSearchUser(e.target.value)}
            className="select select-md ml-2"
          >
            <option value="">Cliente</option>
            {users
              .filter((u) => u.role === "USER")
              .map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
          </select>
          <select
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select select-md ml-2"
          >
            <option value="">Estado</option>
            <option value="pending">Pendiente</option>
            <option value="paid">Pagado</option>
            <option value="all">Todos</option>
          </select>
        </div>
        <span className="text-center text-xl mt-1 font-bold">
          Total: {formatPrice(totalAmountFiltred)}
        </span>
      </div>
      {items.map((item, index) => (
        <div key={item.id} className="mb-4">
          <div className="collapse collapse-arrow bg-base-200">
            <input
              type="checkbox"
              checked={openIndex === index}
              onChange={() => setOpenIndex(openIndex === index ? null : index)}
            />
            <div className="collapse-title text-lg font-medium flex justify-between items-center">
              <span>{item.user}</span>
              <span>{formatDate(item.createdAt)}</span>
              <span className="">{formatPrice(item.total)}</span>
            </div>
            <div className="collapse-content">
              <table className="table w-full text-sm">
                <thead>
                  <tr>
                    <th>Consumo</th>
                    <th>Cantidad</th>
                    <th>Valores</th>
                  </tr>
                </thead>
                <tbody>
                  {item.consumption.map(
                    ({ id, nameDrink, unit, quantity, price, total }) => (
                      <tr key={unit}>
                        <td className="flex flex-col">
                          <span className="text-xs">{nameDrink}</span>
                          <span className="text-sm capitalize font-bold">
                            {unit}
                          </span>
                        </td>
                        <td>{quantity}</td>
                        <td className="flex flex-col">
                          <span className="text-xs">{formatPrice(price)}</span>
                          <span className="text-sm camelCase font-bold">
                            {formatPrice(total)}
                          </span>
                        </td>
                      </tr>
                    )
                  )}
                  <tr>
                    <td className="text-center" colSpan="3">
                      {item.status === "pending" ? (
                        <button
                          className="btn btn-sm text-sm btn-info"
                          onClick={() => {
                            handleClick(item.id);
                            // console.log();
                          }}
                        >
                          Pagar
                        </button>
                      ) : (
                        <span className="bg-green-700 rounded-full text-white text-xs px-2 py-1">
                          Pagado
                        </span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PendingAccountsTable;
