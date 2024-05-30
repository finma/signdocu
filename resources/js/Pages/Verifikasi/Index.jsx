import Button from "@/Components/Atoms/Button";
import Icon from "@/Components/Atoms/Icon";
import FormVerifikasi from "@/Components/Organisms/Verifikasi/FormVerifikasi";
import Found from "@/Components/Organisms/Verifikasi/Found";
import UseRiwayatShow from "@/Hooks/Riwayat/UseRiwayatShow";
import AppContentLayout from "@/Layouts/AppContentLayout";
import Section from "@/Layouts/Partials/Section";
import { Head, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Verifikasi({ title, document, filtered, flash }) {
    // const [hash, setHash] = useState(filtered);
    // const [loading, setLoading] = useState(false);

    // const { handleDownload } = UseRiwayatShow(flash, document);

    // const submit = () => {
    //     setLoading(true);
    //     setTimeout(() => {
    //         router.get(route("verifikasi.index", { hash }));
    //         setLoading(false);
    //     }, 300);
    // };

    // useEffect(() => {
    //     if (hash && !document) {
    //         toast.error("Tidak ada dokumen ditemukan", {
    //             theme: "colored",
    //         });
    //     }
    // }, [document]);
    return (
        <AppContentLayout active={title} title={title}>
            <Head title={title} />
            <div className="flex flex-col gap-5">
                <Section title="Verifikasi Dokumen">
                    <FormVerifikasi flash={flash} />
                    {/* <div className="flex flex-col gap-3 justify-end">
                        <div className="relative w-full">
                            <Icon
                                icon="hash"
                                className="absolute top-3 left-3 text-gray-400"
                            />
                            <input
                                type="search"
                                // minLength={2}
                                // debounceTimeout={300}
                                value={hash}
                                onChange={(e) => setHash(e.target.value)}
                                placeholder="Masukkan Hash Dokumen"
                                className="pl-8 pr-4 py-3 w-full rounded-lg border border-gray-200 bg-gray-50 outline-none focus:border-color-primary"
                                required
                            />
                        </div>
                        <Button
                            size="sm"
                            type="submit"
                            disabled={!hash}
                            onClick={submit}
                        >
                            {loading ? (
                                <div className="flex justify-center gap-2">
                                    <ClipLoader color="#fff" size={15} />
                                    <span>Submit</span>
                                </div>
                            ) : (
                                <>
                                    <Icon
                                        icon="send"
                                        me={2}
                                        className="text-sm"
                                    />
                                    Submit
                                </>
                            )}
                        </Button>
                    </div> */}
                </Section>
                {document ? (
                    <Section>
                        <Found
                            documents={document}
                            handleDownload={handleDownload}
                        />
                    </Section>
                ) : null}
            </div>
        </AppContentLayout>
    );
}
