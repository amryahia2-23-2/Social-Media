import { Link, useNavigate, useLocation } from "react-router-dom";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, Badge } from "@heroui/react";
import { Home, User, Bell, Menu, Moon, Sun } from "lucide-react";
import { useUser } from "../hooks/useUser";
import { useNotifications } from "../hooks/useNotifications";
import { useTheme } from "../hooks/useTheme";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useUser();
    const { unreadCount } = useNotifications();
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="bg-[#FEFEFE] dark:bg-[#030637] shadow-sm border-b border-gray-200 dark:border-[#3F0071] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-14">
                    {/* Logo */}
                    <Link to="/home" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-[#0d47a1] dark:bg-gradient-to-br dark:from-[#610094] dark:to-[#3F0071] rounded-lg flex items-center justify-center shadow-lg dark:shadow-[#610094]/50">
                            <span className="text-white font-bold text-sm">RP</span>
                        </div>
                        <h1 className="text-lg font-bold text-gray-900 dark:text-white hidden sm:block">Route Posts</h1>
                    </Link>

                    {/* Center Navigation - Hidden on mobile */}
                    <div className="flex items-center space-x-8 border-1 border-gray-300 dark:border-[#3F0071] dark:bg-[#3F0071]/20 py-2 px-5 rounded-full backdrop-blur-sm">
                        <Link
                            to="/home"
                            className={`flex items-center space-x-2 transition ${location.pathname === "/home"
                                ? "text-[#1877F2] dark:text-[#610094]"
                                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                }`}
                        >
                            <Home size={20} />
                            <span className="font-extrabold text-sm hidden md:block">Feed</span>
                        </Link>

                        <Link
                            to="/profile"
                            className={`flex items-center space-x-2 transition ${location.pathname === "/profile" || location.pathname.startsWith("/profile/")
                                ? "text-[#1877F2] dark:text-[#610094]"
                                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                }`}
                        >
                            <User size={20} />
                            <span className="font-extrabold text-sm hidden md:block">Profile</span>
                        </Link>

                        <Link
                            to="/notifications"
                            className={`flex items-center space-x-2 transition relative ${location.pathname === "/notifications"
                                ? "text-[#1877F2] dark:text-[#610094]"
                                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                }`}
                        >
                            <div className="relative flex justify-center items-center">
                                <Bell size={20} />
                                {unreadCount > 0 && (
                                    <Badge
                                        content={unreadCount > 99 ? "99+" : unreadCount}
                                        color="danger"
                                        size="sm"
                                        className="absolute -top-2 right-0"
                                    />
                                )}
                            </div>
                            <span className="font-extrabold text-sm hidden md:block">Notifications</span>
                        </Link>
                    </div>

                    {/* Right Side - User */}
                    <div className="flex items-center justify-center space-x-2 sm:space-x-3 border-1 border-gray-300 dark:border-[#3F0071] dark:bg-[#3F0071]/20 py-1 px-1 rounded-full backdrop-blur-sm">
                        <Avatar
                            src={user?.photo || "https://i.pravatar.cc/150?u=default"}
                            size="sm"
                            className="w-8 h-8"
                        />
                        <span className="font-medium text-gray-700 dark:text-gray-200 text-sm hidden sm:inline ">
                            {user?.name || "amr"}
                        </span>
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <button className="p-1 hover:bg-gray-100 dark:hover:bg-[#3F0071]/30 rounded">
                                    <Menu size={16} className="text-gray-600 dark:text-gray-300" />
                                </button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="User Actions"
                                classNames={{
                                    base: "dark:bg-[#030637]",
                                    list: "dark:bg-[#030637]",
                                }}
                            >
                                <DropdownItem
                                    key="profile"
                                    onClick={() => navigate("/profile")}
                                    classNames={{ base: "dark:text-gray-200 dark:data-[hover=true]:bg-[#3F0071]/30" }}
                                >
                                    Profile
                                </DropdownItem>
                                <DropdownItem
                                    key="settings"
                                    onClick={() => navigate("/settings")}
                                    classNames={{ base: "dark:text-gray-200 dark:data-[hover=true]:bg-[#3F0071]/30" }}
                                >
                                    Settings
                                </DropdownItem>
                                <DropdownItem
                                    key="theme"
                                    onClick={toggleTheme}
                                    startContent={theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                                    classNames={{ base: "dark:text-gray-200 dark:data-[hover=true]:bg-[#3F0071]/30" }}
                                >
                                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                                </DropdownItem>
                                <DropdownItem
                                    key="logout"
                                    color="danger"
                                    onClick={handleLogout}
                                    className="text-danger dark:text-red-400"
                                    classNames={{ base: "dark:data-[hover=true]:bg-red-900/30" }}
                                >
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </nav>
    );
}
