import { Outlet } from "react-router-dom";
import AppBar from "../AppBar/AppBar";
import { Suspense } from "react";

export default function Layout() {
  return (
    <>
      <AppBar />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
}