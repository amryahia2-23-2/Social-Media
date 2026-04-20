import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-[#f0f2f5] dark:bg-[#04001b]">
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}
