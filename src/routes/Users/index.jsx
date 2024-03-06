import React from "react";
import { Routes, Route } from "react-router-dom";
import UserEdit from "../UserEdit";
import UsersList from "../UsersList";

export default function Users() {
  return (
    <Routes>
      <Route path="/" exact element={<UsersList />} />
      <Route path="edit/:id" element={<UserEdit />} />
      <Route path="new" element={<UserEdit />} />
    </Routes>
  );
}
