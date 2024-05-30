import Button from "@/Components/Atoms/Button";
import Icon from "@/Components/Atoms/Icon";
import UseFormVerifikasi from "@/Hooks/Verifikasi/UseFormVerifikasi";
import { ClipLoader } from "react-spinners";
import DataBlockChainSignature from "./DataBlockChainSignature";
import Found from "./Found";

const FormVerifikasi = ({ flash }) => {
    const {
        dokumen,
        setDokumen,
        dokumenData,
        loading,
        isVerified,
        showResult,
        setShowResult,
        showDocument,
        setShowDocument,
        documentVerification,
        handleDownload,
    } = UseFormVerifikasi(flash);

    return (
        <>
            <div className="flex flex-col gap-3 justify-end">
                <div className="relative w-full">
                    <input
                        type="file"
                        name="dokumen"
                        onChange={(e) => {
                            setShowResult(false);
                            setDokumen(e.target.files[0]);
                        }}
                        placeholder="Masukkan Hash Dokumen"
                        className="pl-4 pr-4 py-3 w-full rounded-lg border border-gray-200 bg-gray-50 outline-none focus:border-color-primary"
                        required
                    />
                </div>
                <Button
                    size="sm"
                    type="submit"
                    disabled={!dokumen}
                    onClick={() => documentVerification(dokumen)}
                >
                    {loading ? (
                        <div className="flex justify-center gap-2">
                            <ClipLoader color="#fff" size={15} />
                            <span>Submit</span>
                        </div>
                    ) : (
                        <>
                            <Icon icon="send" me={2} className="text-sm" />
                            Submit
                        </>
                    )}
                </Button>
            </div>
            <hr className="my-5" />
            {showResult ? (
                isVerified ? (
                    <div className="flex flex-col gap-5">
                        <DataBlockChainSignature
                            signedBy={dokumenData.ethereum_address.user.name}
                            ethAddress={dokumenData.ethereum_address.address}
                            documentHash={dokumenData.blockchain_document_hash}
                            signatureHash={dokumenData.blockchain_signature}
                        />

                        <Button
                            outline
                            size="sm"
                            className="w-full"
                            onClick={() => setShowDocument(!showDocument)}
                        >
                            {showDocument ? (
                                <div className="flex justify-center gap-3">
                                    <span>Sembunyikan Detail Dokumen</span>
                                    <Icon icon="chevron-up" />
                                </div>
                            ) : (
                                <div className="flex justify-center gap-3">
                                    <span>Munculkan Detail Dokumen</span>
                                    <Icon icon="chevron-down" />
                                </div>
                            )}
                        </Button>
                        {showDocument ? (
                            <Found
                                documents={dokumenData}
                                handleDownload={handleDownload}
                            />
                        ) : null}
                    </div>
                ) : (
                    <div className="border border-color-primary px-5 py-10 rounded-lg bg-color-primary/5">
                        <div className="flex flex-col justify-center items-center gap-5">
                            <Icon
                                icon="x-circle"
                                style={{ fontSize: "50px" }}
                                className="text-color-primary"
                            />
                            <span className="text-color-primary font-medium">
                                Dokumen tidak terverifikasi / tidak valid
                            </span>
                        </div>
                    </div>
                )
            ) : null}
        </>
    );
};

export default FormVerifikasi;
