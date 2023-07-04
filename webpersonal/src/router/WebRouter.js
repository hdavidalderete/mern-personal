import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/web/Home";
import { WebLayout } from "../layouts";
import { Blog, Contact, Courses, Post } from "../pages/web";

export function WebRouter() {
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };

  return (
    <Routes>
      <Route path="/" element={loadLayout(WebLayout, Home)}></Route>
      <Route path="/courses" element={loadLayout(WebLayout, Courses)}></Route>
      <Route path="/contact" element={loadLayout(WebLayout, Contact)}></Route>
      <Route path="/blog" element={loadLayout(WebLayout, Blog)}></Route>
      <Route path="/blog/:path" element={loadLayout(WebLayout, Post)}></Route>
    </Routes>
  );
}
