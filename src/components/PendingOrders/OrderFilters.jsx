import React from "react";
import { formatPrice } from "../../utils/formatPrice";

const OrderFilters = ({ users, setSearchUser, setStatusFilter, total }) => {
  return (
    <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center">
      <div className="flex gap-2 md:w-2/3">
        <select onChange={(e) => setSearchUser(e.target.value)} className="select select-md ml-2">
          <option value="">Cliente</option>
          {users.filter((u) => u.role === "USER").map((u) => (
            <option key={u.id} value={u.name}>{u.name}</option>
          ))}
        </select>
        <select onChange={(e) => setStatusFilter(e.target.value)} className="select select-md ml-2">
          <option value="">Estado</option>
          <option value="pending">Pendiente</option>
          <option value="paid">Pagado</option>
          <option value="all">Todos</option>
        </select>
      </div>
      <span className="text-center text-xl mt-1 font-bold">Total: {formatPrice(total)}</span>
    </div>
  );
};

export default OrderFilters;