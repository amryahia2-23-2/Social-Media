import { Tabs, Tab } from "@heroui/react"
import { useNavigate, useLocation, Outlet } from "react-router-dom"

export default function AuthLayout() {
    const navigate = useNavigate()
    const location = useLocation()

    const currentTab =
        location.pathname === "/register" ? "register" : "/"

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] dark:bg-[#04001b] py-12 px-4">
            <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between">
                {/* Left Side - About Section */}
                <div className="space-y-6 hidden max-w-xl lg:block">
                    <div>
                        <h1 className="text-6xl font-extrabold text-[#00298D] dark:text-[#610094] mb-4">Route Posts</h1>
                        <p className="text-gray-800 dark:text-gray-200 text-2xl font-medium">
                            Connect with friends and the world around you on Route Posts.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-[#030637] p-6 rounded-xl shadow-md dark:border dark:border-[#610094]/30">
                        <h3 className="text-[#0d2f8b] dark:text-[#610094] font-bold text-sm uppercase mb-2">
                            ABOUT ROUTE ACADEMY
                        </h3>
                        <h4 className="text-xl font-bold mb-4 dark:text-white">
                            Egypt's Leading IT Training Center Since 2012
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                            Route Academy is the premier IT training center in Egypt, established in 2012. We
                            specialize in delivering high-quality training courses in programming, web development,
                            and application development. We've simplified the unique challenges people face
                            when learning new technology and made efforts to provide strategies to overcome them.
                        </p>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="border-l-4 border-[#0d2f8b] dark:border-[#610094] pl-3">
                                <div className="text-3xl font-bold text-gray-900 dark:text-white">2012</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase">Founded</div>
                            </div>
                            <div className="border-l-4 border-[#0d2f8b] dark:border-[#610094] pl-3">
                                <div className="text-3xl font-bold text-gray-900 dark:text-white">400+</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase">Graduates</div>
                            </div>
                            <div className="border-l-4 border-[#0d2f8b] dark:border-[#610094] pl-3">
                                <div className="text-3xl font-bold text-gray-900 dark:text-white">50+</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase">Partner Companies</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="border-l-4 border-[#0d2f8b] dark:border-[#610094] pl-3">
                                <div className="text-3xl font-bold text-gray-900 dark:text-white">5</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase">Branches</div>
                            </div>
                            <div className="border-l-4 border-[#0d2f8b] dark:border-[#610094] pl-3">
                                <div className="text-3xl font-bold text-gray-900 dark:text-white">20</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase">Diplomas Available</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Auth Section */}

                <div className="bg-white dark:bg-[#030637] mt-4 p-8 rounded-2xl shadow-xl h-fit w-full max-w-107.5 dark:border dark:border-[#610094]/30">
                    <div className="text-center mb-3 lg:hidden ">
                        <h1 className="text-3xl font-extrabold text-[#00298D] dark:text-[#610094] mb-4">Route Posts</h1>
                        <p className="text-gray-800 dark:text-gray-200 text-medium font-medium">
                            Connect with friends and the world around you on Route Posts.
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
