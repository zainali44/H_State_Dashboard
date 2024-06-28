import React from "react";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import Properties from "views/admin/marketplace/Properties/New_Property";
import Testing from "testing";
import Chat from "Chat/Chat";
const App = () => {

  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="rtl/*" element={<RtlLayout />} />
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="properties" element={<Properties />} />
      <Route path="/testing" element={<Testing />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default App;
