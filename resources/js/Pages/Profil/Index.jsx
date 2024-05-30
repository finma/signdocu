import DetailSertifikat from "@/Components/Organisms/Profil/DetailSertifikat";
import FormProfil from "@/Components/Organisms/Profil/FormProfil";
import FormUbahPassword from "@/Components/Organisms/Profil/FormUbahPassword";
import TopNavigation from "@/Components/Organisms/Profil/TopNavigation";
import AppContentLayout from "@/Layouts/AppContentLayout";
import Section from "@/Layouts/Partials/Section";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Index({ title, tab, auth, certificate, flash }) {
    const [activeTab, setActiveTab] = useState(tab ? tab : "profil");

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success, {
                theme: "colored",
            });
        }
        if (flash.error) {
            toast.error(flash.error, {
                theme: "colored",
            });
        }
    }, [flash]);

    return (
        <AppContentLayout active={title} title={title}>
            <Head title={title} />

            <Section>
                <TopNavigation
                    active={activeTab}
                    setActiveTab={setActiveTab}
                    hasCertificate={certificate}
                />
                {activeTab === "profil" ? (
                    <FormProfil profil={auth.user} />
                ) : activeTab === "sertifikat" ? (
                    <DetailSertifikat
                        hasCertificate={certificate}
                        resetPassphrase={flash.success !== null}
                    />
                ) : (
                    <FormUbahPassword />
                )}
            </Section>
        </AppContentLayout>
    );
}

export default Index;
