import ApplicationLogoImage from "@/Components/Atoms/ApplicationLogoImage";
import AppLayout from "@/Layouts/AppLayout";
import { Head, router } from "@inertiajs/react";
import { useEffect } from "react";

export default function SplashScreen() {
    useEffect(() => {
        setTimeout(() => {
            router.get(route("home"));
        }, 1500);
    }, []);

    return (
        <AppLayout>
            <Head title="Digital Signature in Blockchain" />
            <div className="flex flex-col justify-center gap-5 h-full md:py-10">
                <div className="flex justify-center">
                    <ApplicationLogoImage width={240} />
                </div>
            </div>
        </AppLayout>
    );
}
