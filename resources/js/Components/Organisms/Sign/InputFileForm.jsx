import Icon from "@/Components/Atoms/Icon";
import clsx from "clsx";

function InputFileForm({ file, errors, handleFileChange, disabledSelectFile }) {
    return (
        <>
            <label
                htmlFor="file"
                className={clsx(
                    errors.file ? "border-red-500" : "border-color-secondary",
                    "border  rounded-3xl flex justify-center items-center h-[550px] cursor-pointer hover:bg-gray-100"
                )}
            >
                <div className="flex flex-col items-center gap-3">
                    {errors.file ? (
                        <>
                            <Icon
                                icon="exclamation-triangle"
                                className="text-[40px] text-red-500"
                            />
                            <span className="text-red-500 text-base">
                                {errors.file}
                            </span>
                        </>
                    ) : (
                        <>
                            <Icon
                                icon="file-earmark-pdf"
                                className="text-[40px] text-gray-300"
                            />
                            <span className="text-gray-300 text-base">
                                {!disabledSelectFile ? 'Pilih Dokumen' : 'Browser Anda belum terinstall metamask'}
                            </span>
                        </>
                    )}
                </div>
            </label>
            <input
                id="file"
                type="file"
                className="hidden"
                accept="application/pdf"
                onChange={handleFileChange}
                disabled={disabledSelectFile}
            />
        </>
    );
}

export default InputFileForm;
