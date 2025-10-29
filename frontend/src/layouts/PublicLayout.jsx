import { Outlet } from "react-router-dom";
import PublicNav from "../components/public/PublicNav.jsx";
import PublicFooter from "../components/public/PublicFooter.jsx";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <PublicNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}