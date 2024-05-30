import InputError from "@/Components/Atoms/InputError";
import InputLabel from "@/Components/Atoms/InputLabel";
import ButtonSubmitForm from "@/Components/Molecules/Profil/ButtonSubmitForm";
import UseFormFileSertifikat from "@/Hooks/Profil/UseFormFileSertifikat";
import { Input } from "antd";
import clsx from "clsx";

function FormFileSertifikat({
    hasCertificate = false,
    resetPassphrase = false,
}) {
    const {
        handleChange,
        data,
        submit,
        processing,
        errors,
        reset,
        errorClients,
    } = UseFormFileSertifikat();

    const fileCrt = () => {
        if (hasCertificate.file_crt) {
            return (
                <a
                    href={`/storage/sertifikat/${hasCertificate.hash}/${hasCertificate.file_crt}`}
                    className="border border-green-500 hover:bg-green-500/15 transition-all duration-300 rounded-md p-2"
                >
                    <span className="text-green-500 font-semibold">
                        {hasCertificate.file_crt}
                    </span>
                </a>
            );
        }
    };

    const fileP12 = () => {
        if (hasCertificate.file_p12) {
            return (
                <a
                    href={`/storage/sertifikat/${hasCertificate.hash}/${hasCertificate.file_p12}`}
                    className="border border-green-500 hover:bg-green-500/15 transition-all duration-300 rounded-md p-2"
                >
                    <span className="text-green-500 font-semibold">
                        {hasCertificate.file_p12}
                    </span>
                </a>
            );
        }
    };

    const fileKey = () => {
        if (hasCertificate.file_key) {
            return (
                <a
                    href={`/storage/sertifikat/${hasCertificate.hash}/${hasCertificate.file_key}`}
                    className="border border-green-500 hover:bg-green-500/15 transition-all duration-300 rounded-md p-2"
                >
                    <span className="text-green-500 font-semibold">
                        {hasCertificate.file_key}
                    </span>
                </a>
            );
        }
    };

    return (
        <form className="flex flex-col gap-3 mt-5" onSubmit={submit}>
            <div className="flex flex-col gap-2 w-full">
                <InputLabel required>File .crt</InputLabel>
                <Input
                    type="file"
                    name="file_crt"
                    onChange={handleChange}
                    className={clsx(
                        errorClients.file_crt && "border-red-500",
                        "py-2"
                    )}
                    accept=".crt"
                    required
                />
                {errorClients.file_crt || data.file_crt ? (
                    <InputError message={errorClients.file_crt} />
                ) : (
                    fileCrt()
                )}
            </div>
            <div className="flex flex-col gap-2 w-full">
                <InputLabel required>File .p12</InputLabel>
                <Input
                    type="file"
                    name="file_p12"
                    onChange={handleChange}
                    className={clsx(
                        errorClients.file_p12 && "border-red-500",
                        "py-2"
                    )}
                    accept=".p12"
                    required
                />
                {errorClients.file_p12 || data.file_p12 ? (
                    <InputError message={errorClients.file_p12} />
                ) : (
                    fileP12()
                )}
            </div>
            <div className="flex flex-col gap-2 w-full">
                <InputLabel required>File .key</InputLabel>
                <Input
                    type="file"
                    name="file_key"
                    onChange={handleChange}
                    className={clsx(
                        errorClients.file_key && "border-red-500",
                        "py-2"
                    )}
                    accept=".key"
                    required
                />
                {errorClients.file_key || data.file_key ? (
                    <InputError message={errorClients.file_key} />
                ) : (
                    fileKey()
                )}
            </div>
            <ButtonSubmitForm
                reset={reset}
                processing={processing}
                disabled={
                    errorClients.file_crt ||
                    errorClients.file_p12 ||
                    errorClients.file_key ||
                    data.file_crt == "" ||
                    data.file_p12 == "" ||
                    data.file_key == ""
                }
            />
        </form>
    );
}

export default FormFileSertifikat;
