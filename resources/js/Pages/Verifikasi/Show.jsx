import Found from "@/Components/Organisms/Verifikasi/Found";
import NotFound from "@/Components/Organisms/Verifikasi/NotFound";
import UseRiwayatShow from "@/Hooks/Riwayat/UseRiwayatShow";
import AppVerifikasiLayout from "@/Layouts/AppVerifikasiLayout";
import Section from "@/Layouts/Partials/Section";
import { Head } from "@inertiajs/react";

export default function Show({ title, documents, flash }) {
    const { handleDownload } = UseRiwayatShow(flash, documents);

    return (
        <AppVerifikasiLayout
            active={title}
            title={title}
            found={documents !== "not found"}
        >
            <Head title={title} />

            <Section isVerifikasi>
                {documents !== "not found" ? (
                    <Found
                        documents={documents}
                        handleDownload={handleDownload}
                    />
                ) : (
                    <NotFound />
                )}
            </Section>
        </AppVerifikasiLayout>
    );
}
