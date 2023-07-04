import React from "react";
import { Routes, Route } from "react-router-dom";
import { Auth, Blog, Courses, Menu, Newsletter, Users } from "../pages/admin";
import { AdminLayout } from "../layouts";
import { useAuth } from "../hooks";

export function AdminRouter() {
  const { user } = useAuth();
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };

  return (
    <Routes>
      {!user ? (
        <Route path="/admin/*" element={<Auth />}></Route>
      ) : (
        <>
          {["/admin", "/admin/blog"].map((path) => (
            <Route
              key={path}
              path={path}
              element={loadLayout(AdminLayout, Blog)}
            ></Route>
          ))}
          <Route
            path="/admin/users"
            element={loadLayout(AdminLayout, Users)}
          ></Route>
          <Route
            path="/admin/courses"
            element={loadLayout(AdminLayout, Courses)}
          ></Route>
          <Route
            path="/admin/menu"
            element={loadLayout(AdminLayout, Menu)}
          ></Route>
          <Route
            path="/admin/newsletter"
            element={loadLayout(AdminLayout, Newsletter)}
          ></Route>
        </>
      )}
    </Routes>
  );
}
