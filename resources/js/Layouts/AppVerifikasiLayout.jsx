import clsx from "clsx";

function AppVerifikasiLayout({ children, found=true }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center sm:pt-0 bg-gray-100">
            <div className={clsx(!found && "h-[100vh] lg:h-[50vh]", "w-full lg:w-[1000px] lg:my-5 overflow-hidden bg-white shadow-md sm:rounded-lg text-gray-500 text-sm")}>
                <div className="bg-color-primary flex justify-center items-center h-[50px]">
                    <span className="text-white text-lg font-medium">Verifikasi Dokumen</span>
                </div>
                <div className="relative">
                    <main className="flex flex-col pt-7 lg:pt-0">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default AppVerifikasiLayout;
