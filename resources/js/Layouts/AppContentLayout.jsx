import { usePage } from "@inertiajs/react";
import Navbar from "./Partials/Navbar";
import BottomNavigation from "./Partials/BottomNavigation";
import { ToastContainer } from "react-toastify";

function AppContentLayout({ children, title, active, connectedMetamask = false}) {
    const { props } = usePage();
    const { auth } = props;
    return (
        <div className="min-h-screen flex flex-col sm:pt-0 bg-gray-50 md:bg-gray-200">
            <div className="w-full h-auto bg-gray-200 overflow-hidden text-gray-500 text-sm">
                <Navbar auth={auth} title={title} active={active} connectedMetamask={connectedMetamask} />
                <div className="relative bg-gray-50 lg:bg-gray-200 container mx-auto lg:w-[1000px] h-full md:h-auto">
                    <main className="flex flex-col pt-7 pb-24 md:py-5">{children}</main>
                </div>
                <BottomNavigation active={active} auth={auth} />
            </div>
            <ToastContainer />
        </div>
    );
}

export default AppContentLayout;
