import Button from "@/Components/Atoms/Button";
import DetailDokumenItem from "@/Components/Atoms/DetailDokumenItem";
import Icon from "@/Components/Atoms/Icon";
import SectionTitle from "@/Components/Atoms/SectionTitle";
import InputFileViewer from "@/Components/Organisms/Sign/InputFileViewer";
import UseRiwayatShow from "@/Hooks/Riwayat/UseRiwayatShow";
import AppContentLayout from "@/Layouts/AppContentLayout";
import Section from "@/Layouts/Partials/Section";
import { formatDateString } from "@/Utils/GlobalFunction";
import { Head } from "@inertiajs/react";

function Show({ title, documents, flash }) {
    const { handleDownload } = UseRiwayatShow(flash, documents);

    return (
        <AppContentLayout active="Riwayat" title="Riwayat Detail">
            <Head title={title} />

            <Section isVerifikasi>
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                        <SectionTitle title="Detail Dokumen" />
                        <div className="flex gap-3">
                            <img
                                src={documents.qrcode}
                                alt={documents.perihal}
                                className="w-[100px] border rounded-xl p-2"
                            />
                        </div>
                        <table className="table-auto w-full" cellPadding={3}>
                            <tbody>
                                <DetailDokumenItem
                                    label="Tanggal"
                                    value={formatDateString(
                                        documents.signed_at
                                    )}
                                />
                                <DetailDokumenItem
                                    label="Perihal"
                                    value={documents.perihal}
                                />
                                <DetailDokumenItem
                                    label="Penandatangan"
                                    value={documents.signer.user.name}
                                />
                                {documents.signer.jabatan ? (
                                    <DetailDokumenItem
                                        label="Jabatan"
                                        value={documents.signer.jabatan}
                                    />
                                ) : null}
                                <DetailDokumenItem
                                    label="Lembaga/Unit"
                                    value={documents.signer.lembaga}
                                />
                                <tr>
                                    <td colSpan={3}>
                                        <Button
                                            size="sm"
                                            onClick={handleDownload}
                                            className="mt-2"
                                        >
                                            <Icon icon="download" me={2} />{" "}
                                            Unduh Dokumen
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mb-20 lg:mb-0">
                        <SectionTitle title="Preview Dokumen" />
                        <InputFileViewer file={documents.dokumen} />
                    </div>
                </div>
            </Section>
        </AppContentLayout>
    );
}

export default Show;
