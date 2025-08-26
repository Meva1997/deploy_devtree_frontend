import { Outlet } from "react-router-dom"; // Importing Outlet to render nested routes
import { Toaster } from "sonner";
import Logo from "../components/Logo";

export default function AuthLayout() {
  return (
    <>
      <div className="bg-slate-800 min-h-dvh">
        <div className="max-w-lg px-5 pt-10 mx-auto">
          <Logo />
          <div className="py-10">
            <Outlet />
          </div>
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </>
  );
}
