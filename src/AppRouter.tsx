import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./App";
export function AppRouter() {
  return <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/c/" element={<App locale="zh-TW" />} />
          <Route path="/m/" element={<App locale="ms" />} />
        </Routes>
    </BrowserRouter>;
}
