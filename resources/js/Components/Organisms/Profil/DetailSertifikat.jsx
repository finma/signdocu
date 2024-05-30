import Icon from "@/Components/Atoms/Icon";
import { QRCodeSVG } from "qrcode.react";
import FormSertifikat from "./FormSertifikat";
import Button from "@/Components/Atoms/Button";
import { useState } from "react";
import FormFileSertifikat from "./FormFileSertifikat";
import { formatDate } from "@/Utils/GlobalFunction";

function DetailSertifikat({ hasCertificate = false, resetPassphrase = false }) {
    const [isActive, setIsActive] = useState("data");

    let verifiedIcon = "patch-check-fill";
    let verifiedColor = "text-green-500";
    let verifiedLabel = "Sudah Terverifikasi";

    // if (
    //     hasCertificate?.file_crt !== null &&
    //     hasCertificate?.file_key !== null &&
    //     hasCertificate?.file_12 !== null
    // ) {
    //     verifiedIcon = "patch-check-fill";
    //     verifiedColor = "text-green-500";
    //     verifiedLabel = "Sudah Terverifikasi";
    // } else {
    //     verifiedIcon = "x-circle-fill";
    //     verifiedColor = "text-red-500";
    //     verifiedLabel = "Belum Terverifikasi";
    // }

    return (
        <>
            {hasCertificate ? (
                <>
                    <div className="flex flex-col md:flex-row md:items-center gap-3 mt-5">
                        <div className="border md:w-[138px] w-[108px] rounded p-2">
                            <QRCodeSVG
                                value={hasCertificate.hash}
                                imageSettings={{
                                    src: hasCertificate.user.avatar
                                        ? hasCertificate.user.avatar
                                        : `https://ui-avatars.com/api/?name=${hasCertificate.user.name}&background=009B4D&color=fff`,
                                    x: undefined,
                                    y: undefined,
                                    height: 25,
                                    width: 25,
                                    excavate: true,
                                }}
                                size={100}
                                className="w-[90px] h-[90px] md:w-[120px] md:h-[120px]"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex flex-col gap-1 group text-sm">
                                <div className="flex gap-2">
                                    <Icon icon="person" />
                                    <span>{hasCertificate.user.name}</span>
                                </div>
                                <div className="flex gap-2">
                                    <Icon icon="briefcase" />
                                    <span>
                                        {hasCertificate.jabatan
                                            ? hasCertificate.jabatan
                                            : "-"}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <Icon icon="building" />
                                    <span>{hasCertificate.lembaga}</span>
                                </div>
                                <div className="flex gap-2">
                                    <Icon
                                        icon={verifiedIcon}
                                        className={verifiedColor}
                                    />
                                    <span className={verifiedColor}>
                                        {verifiedLabel}{" "}
                                        {/* {verifiedLabel ===
                                        "Sudah Terverifikasi" ? (
                                            <small className="italic text-yellow-500">
                                                (expired :{" "}
                                                {formatDate(
                                                    hasCertificate.expired_at
                                                )}
                                                )
                                            </small>
                                        ) : null} */}
                                    </span>
                                </div>
                            </div>
                            {/* <div className="mt-2">
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        outline={isActive !== "data"}
                                        onClick={() => setIsActive("data")}
                                    >
                                        <Icon icon="pencil" me={2} /> Data
                                        Sertifikat
                                    </Button>
                                    <Button
                                        warning={
                                            verifiedLabel ===
                                            "Belum Terverifikasi"
                                        }
                                        size="sm"
                                        outline={isActive !== "file"}
                                        onClick={() => setIsActive("file")}
                                    >
                                        <Icon icon="file-earmark" me={2} /> File
                                        Sertifikat
                                    </Button>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    {isActive === "data" ? (
                        <FormSertifikat
                            resetPassphrase={resetPassphrase}
                            hasCertificate={hasCertificate}
                        />
                    ) : (
                        <FormFileSertifikat
                            resetPassphrase={resetPassphrase}
                            hasCertificate={hasCertificate}
                        />
                    )}
                </>
            ) : (
                <FormSertifikat
                    resetPassphrase={resetPassphrase}
                    hasCertificate={hasCertificate}
                />
            )}
        </>
    );
}

export default DetailSertifikat;
