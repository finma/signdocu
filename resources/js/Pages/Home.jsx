import SectionAksesMenu from "@/Components/Organisms/Home/SectionAksesMenu";
import SectionInformasiTtd from "@/Components/Organisms/Home/SectionInformasiTtd";
import AppContentLayout from "@/Layouts/AppContentLayout";
import { Head } from "@inertiajs/react";

export default function Home({ auth, title, certificate }) {
    return (
        <AppContentLayout active={title}>
            <Head title={title} />

            <div className="flex flex-col gap-7 md:gap-5">
                <SectionInformasiTtd auth={auth} certificate={certificate} />
                <SectionAksesMenu auth={auth} />
            </div>
        </AppContentLayout>
    );
}
