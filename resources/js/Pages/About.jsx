import AppContentLayout from "@/Layouts/AppContentLayout";
import Section from "@/Layouts/Partials/Section";
import { Head } from "@inertiajs/react";

export default function About({ title }) {
    return (
        <AppContentLayout active={title} title={title}>
            <Head title={title} />

            <Section title={title}>
                <div className="w-full md:w-[50%] text-sm mt-5">
                    <p className="text-justify mb-2">
                        <b>Digital Signature in Blockchain (Signchain)</b> adalah
                        aplikasi layanan sertifikat elektronik berbasis Blockchain hasil riset kolaborasi antara Universitas Telkom dan Universitas Siliwangi. Aplikasi tersebut merupakan hasil
                        riset tahun 2023 yang dilakukan oleh :
                    </p>
                    <ul className="">
                        <li>1. Prof. Dr. Ir. H. Irfan Darmawan, S.T., M.T., IPU.</li>
                        <li>2. Ir. Alam Rahmatulloh, S.T., M.T., MCE., IPM.</li>
                        <li>3. Rohmat Gunawan, S.T., M.T., MCE.</li>
                        <li>4. Iqbal Muhammad Fajar Nuralam, S.T.</li>
                    </ul>
                </div>
            </Section>
        </AppContentLayout>
    );
}
