import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import AdminPage from "./pages/AdminPage";
import PendingAccountsPage from "./pages/PendingAccountsPage";
import ConfirmModal from "./components/ConfirmationModal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/auth" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/accounts" element={<PendingAccountsPage />} />
        </Route>
      </Routes>
      <ConfirmModal />
    </BrowserRouter>

    // <button className="btn btn-success">Success</button>
  );
}

export default App;
