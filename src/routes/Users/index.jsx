import React from "react";
import { Routes, Route } from "react-router-dom";
import UserEdit from "../UserEdit";
import UsersList from "../UsersList";

export default () => (
  <Routes>
    <Route path="/users" exact component={UsersList} />
    <Route path="/users/edit/:id" component={UserEdit} />
    <Route path="/users/new" component={UserEdit} />
  </Routes>
);
