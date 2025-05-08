import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import AdminPage from "./pages/AdminPage";
import PendingOrdersPage from "./pages/PendingOrdersPage";
import ConfirmModal from "./components/ConfirmationModal";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
       <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" // también puedes usar "dark", "light", "auto"
      />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/auth" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/orders" element={<PendingOrdersPage />} />
        </Route>
      </Routes>
      <ConfirmModal />
    </BrowserRouter>

    // <button className="btn btn-success">Success</button>
  );
}

export default App;
