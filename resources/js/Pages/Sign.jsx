import ModalPassphrase from "@/Components/Organisms/Sign/ModalPassphrase";
import SignButtonNav from "@/Components/Organisms/Sign/SignButtonNav";
import SignHelp from "@/Components/Organisms/Sign/SignHelp";
import SignInputData from "@/Components/Organisms/Sign/SignInputData";
import SignLoading from "@/Components/Organisms/Sign/SignLoading";
import SignQrUpdateForm from "@/Components/Organisms/Sign/SignQrUpdateForm";
import UseSign from "@/Hooks/Sign/UseSign";
import AppContentLayout from "@/Layouts/AppContentLayout";
import Section from "@/Layouts/Partials/Section";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ClockLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";

export default function Sign({ title, flash }) {
    const [filePreview, setFilePreview] = useState(false);
    const [loading, setLoading] = useState(false);

    const resetFile = () => {
        setFile(null);
        setFilePreview(null);
        setUpdateError({
            file: "",
            page: "",
            x: "",
            y: "",
        });
    };

    const {
        data,
        setData,
        processing,
        errors,
        reset,
        file,
        setFile,
        handleChange,
        handleFileChange,
        submit,
        modalOpen,
        handleModalOpen,
        handleModalClose,
        disabledSelectFile,
        connectedMetamask,
    } = UseSign(flash, resetFile);

    const pageRef = useRef();
    const XRef = useRef();
    const YRef = useRef();

    const [qrCode, setQrCode] = useState({
        file: null,
        page: 1,
        x: 0,
        y: 0,
        url: null,
    });
    const [update, setUpdate] = useState(false);
    const [updateError, setUpdateError] = useState({
        file: "",
        page: "",
        x: "",
        y: "",
    });
    const [qrCodeUpdate, setQrCodeUpdate] = useState(false);

    const updateQrCode = (e) => {
        e.preventDefault();
        const pageValue = pageRef.current.value;
        const XValue = XRef.current.value;
        const YValue = YRef.current.value;

        setQrCode({
            page: pageValue,
            x: XValue,
            y: YValue,
        });

        setUpdate(true);
    };

    useEffect(() => {
        // console.log(qrCode);
        if (update || file) {
            generateQRCode(file);
        }
    }, [update, file]);

    const generateQRCode = async (file) => {
        setQrCodeUpdate(false);
        const formData = { ...qrCode, file: file };
        setLoading(true);
        try {
            const response = await axios.post(
                route("sign.update_qrcode"),
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("response: ", response.data.data);
            console.log("qrcode: ", qrCode);

            if (response.data.success) {
                setUpdate(false);
                setUpdateError({
                    file: "",
                    page: "",
                    x: "",
                    y: "",
                });
                setFilePreview(response.data.data.dokumen);
                setData({
                    ...formData,
                    filePreview: response.data.data.dokumen,
                });
                setQrCode({ ...qrCode, url: response.data.data.qrcode });
                setQrCodeUpdate(true);
            }
        } catch (error) {
            if (error.response) {
                // Tangani respons error dari server
                setUpdateError({
                    file:
                        error.response.data.data.file &&
                        error.response.data.data.file[0],
                    page:
                        error.response.data.data.page &&
                        error.response.data.data.page[0],
                    x:
                        error.response.data.data.x &&
                        error.response.data.data.x[0],
                    y:
                        error.response.data.data.y &&
                        error.response.data.data.y[0],
                });
            } else {
                // Tangani kesalahan lainnya
                console.log(error.message);
            }
        }
        setLoading(false);
    };

    return processing ? (
        <SignLoading />
    ) : (
        <AppContentLayout
            active={title}
            title={title}
            connectedMetamask={connectedMetamask}
        >
            <Head title={title} />
            <Section>
                <div className="flex flex-col gap-5">
                    {file ? (
                        !updateError.file ? (
                            <div>
                                <SignQrUpdateForm
                                    updateQrCode={updateQrCode}
                                    qrCode={qrCode}
                                    pageRef={pageRef}
                                    XRef={XRef}
                                    YRef={YRef}
                                />
                                <div className="hidden lg:block mt-5">
                                    <SignButtonNav
                                        resetFile={resetFile}
                                        handleModalOpen={handleModalOpen}
                                        file={file}
                                        disabled={
                                            !file ||
                                            errors.file ||
                                            errors.page ||
                                            errors.x ||
                                            errors.y
                                        }
                                    />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <SignHelp />
                            </div>
                        )
                    ) : (
                        <div>
                            <SignHelp />
                        </div>
                    )}
                    {loading ? (
                        <div className="flex justify-center items-center h-[300px]">
                            <ClockLoader
                                color="#1F3264"
                                loading={loading}
                                size={150}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </div>
                    ) : (
                        <SignInputData
                            handleChange={handleChange}
                            handleFileChange={handleFileChange}
                            errors={updateError}
                            data={data}
                            resetFile={resetFile}
                            file={file}
                            filePreview={filePreview}
                            handleModalOpen={handleModalOpen}
                            disabledSelectFile={disabledSelectFile}
                            qrCode={qrCode}
                            setQrCode={setQrCode}
                            XRef={XRef}
                            YRef={YRef}
                            qrCodeUpdate={qrCodeUpdate}
                        />
                    )}
                </div>
                <ModalPassphrase
                    modalOpen={modalOpen}
                    handleModalClose={handleModalClose}
                    submit={submit}
                    handleChange={handleChange}
                    data={data}
                    errors={errors}
                />
            </Section>
        </AppContentLayout>
    );
}
