import { Tabs, Tab } from "@heroui/react"
import { useNavigate, useLocation, Outlet } from "react-router-dom"

export default function AuthLayout() {
    const navigate = useNavigate()
    const location = useLocation()

    const currentTab =
        location.pathname === "/register" ? "register" : "/"

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] dark:bg-[#04001b] py-12 px-4">
            <div className="mx-auto h-full flex w-full max-w-6xl flex-col items-center gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between">
                {/* Left Side - About Section */}
                <div className="space-y-6 hidden max-w-xl lg:block">
                    <div>
                        <h1 className="text-6xl font-extrabold text-[#00298D] dark:text-[#610094] mb-4">Zentro</h1>
                        <p className="text-gray-800 dark:text-gray-200 text-2xl font-medium">
                            Connect with friends and the world around you on Zentro.
                        </p>
                    </div>
                </div>

                {/* Right Side - Auth Section */}

                <div className="bg-white dark:bg-[#030637] mt-4 p-8 rounded-2xl shadow-xl h-fit w-full max-w-107.5 dark:border dark:border-[#610094]/30">
                    <div className="text-center mb-3 lg:hidden ">
                        <h1 className="text-3xl font-extrabold text-[#00298D] dark:text-[#610094] mb-4">Route Posts</h1>
                        <p className="text-gray-800 dark:text-gray-200 text-medium font-medium">
                            Connect with friends and the world around you on Zentro.
                        </p>
                    </div>
                    <Tabs
                        selectedKey={currentTab}
                        onSelectionChange={(key) => navigate(`/${key}`)}
                        variant="default"
                        classNames={{
                            base: "grid",
                            tabList: "mb-5 grid-cols-2 rounded-xl bg-slate-100 dark:bg-black/30 p-1",
                            tab: "flex-1 text-center py-3 data-[selected=true]:bg-white dark:data-[selected=true]:bg-[#610094] font-extrabold cursor-pointer",
                            tabContent: "group-data-[selected=true]:text-[#0d2f8b] dark:group-data-[selected=true]:text-white dark:text-gray-300",
                        }}
                    >
                        <Tab style={{ color: "#0d2f8b" }} key="/" title="Login" />
                        <Tab key="register" title="Register" />
                    </Tabs>

                    <div className="mt-6">
                        <Outlet />
                    </div>
                </div>

            </div>
        </div>
    )
}
