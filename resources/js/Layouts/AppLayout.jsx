import { ToastContainer } from "react-toastify";

function AppLayout({ children }) {

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center sm:pt-0 bg-gray-100">
            <div className="w-full h-[100vh] md:h-auto sm:max-w-md px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg text-gray-500 text-sm">
                {children}
            </div>
            <ToastContainer />
        </div>
    );
}

export default AppLayout;
