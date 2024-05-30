import InputFileForm from "./InputFileForm";
import InputFileViewer from "./InputFileViewer";
import SignButtonNav from "./SignButtonNav";

function SignInputData({
    handleFileChange,
    resetFile,
    errors,
    file,
    filePreview,
    handleModalOpen,
    disabledSelectFile,
    qrCode,
    setQrCode,
    XRef,
    YRef,
    qrCodeUpdate,
}) {
    return (
        <div className="flex flex-col gap-5">
            {file && filePreview ? (
                <InputFileViewer
                    file={filePreview ? filePreview : file}
                    isPreview={filePreview}
                    qrCode={qrCode}
                    setQrCode={setQrCode}
                    XRef={XRef}
                    YRef={YRef}
                    qrCodeUpdate={qrCodeUpdate}
                />
            ) : (
                <>
                    <InputFileForm
                        handleFileChange={handleFileChange}
                        errors={errors}
                        disabledSelectFile={disabledSelectFile}
                    />
                </>
            )}
            {file ? (
                <div className="lg:hidden">
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
            ) : null}
        </div>
    );
}

export default SignInputData;
