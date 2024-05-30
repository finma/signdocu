import Button from "@/Components/Atoms/Button";
import DetailDokumenItem from "@/Components/Atoms/DetailDokumenItem";
import Icon from "@/Components/Atoms/Icon";
import SectionTitle from "@/Components/Atoms/SectionTitle";
import { formatDateString } from "@/Utils/GlobalFunction";
import InputFileViewer from "../Sign/InputFileViewer";

function Found({ documents, handleDownload }) {
    return (
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
                            value={formatDateString(documents.signed_at)}
                        />
                        <DetailDokumenItem
                            label="Perihal"
                            value={documents.perihal}
                        />
                        <DetailDokumenItem
                            label="Penandatangan"
                            value={documents.signer?.user?.name}
                        />
                        {documents.signer.jabatan ? (
                            <DetailDokumenItem
                                label="Jabatan"
                                value={documents.signer.jabatan}
                            />
                        ) : null}
                        <DetailDokumenItem
                            label="Lembaga/Unit"
                            value={documents.signer?.lembaga}
                        />
                        <tr>
                            <td colSpan={3}>
                                <Button
                                    size="sm"
                                    onClick={handleDownload}
                                    className="mt-2"
                                >
                                    <Icon icon="download" me={2} /> Unduh
                                    Dokumen
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="mb-5">
                <SectionTitle title="Preview Dokumen" />
                <InputFileViewer file={documents.dokumen} />
            </div>
        </div>
    );
}

export default Found;
