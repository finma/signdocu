import InputError from "@/Components/Atoms/InputError";
import InputLabel from "@/Components/Atoms/InputLabel";
import ButtonSubmitForm from "@/Components/Molecules/Profil/ButtonSubmitForm";
import UseFormSertifikat from "@/Hooks/Profil/UseFormSertifikat";
import { Input } from "antd";
import clsx from "clsx";

function FormSertifikat({ hasCertificate = false, resetPassphrase = false }) {
    const {
        auth,
        handleChange,
        handleCheckboxChange,
        submit,
        data,
        processing,
        errors,
        reset,
    } = UseFormSertifikat(hasCertificate);

    return (
        <form className="flex flex-col gap-3 mt-5" onSubmit={submit}>
            <div className="flex flex-col gap-2 w-full">
                <InputLabel>Nama</InputLabel>
                <Input value={auth.user.name} className="py-2" disabled />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <InputLabel required>Unit/Lembaga</InputLabel>
                <Input
                    name="lembaga"
                    placeholder="Masukkan Unit/Lembaga"
                    onChange={handleChange}
                    value={data.lembaga}
                    className={clsx(errors.lembaga && "border-red-500", "py-2")}
                    required
                />
                <InputError message={errors.lembaga} />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <InputLabel>Jabatan</InputLabel>
                <Input
                    name="jabatan"
                    placeholder="Masukkan Jabatan"
                    onChange={handleChange}
                    value={data.jabatan}
                    className={clsx(errors.jabatan && "border-red-500", "py-2")}
                />
                <InputError message={errors.jabatan} />
            </div>
            {hasCertificate ? (
                <div className="flex flex-col gap-2 w-full">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="ubah_passphrase"
                            id="ubah_passphrase"
                            className="w-5 h-5 checked:bg-color-primary"
                            checked={data.ubah_passphrase !== null}
                            onChange={handleCheckboxChange}
                        />
                        <InputLabel htmlFor="ubah_passphrase">
                            Ubah Passphrase
                        </InputLabel>
                    </div>
                </div>
            ) : null}
            {hasCertificate && data.ubah_passphrase ? (
                <>
                    <div className="flex flex-col gap-2 w-full">
                        <InputLabel required>Passphrase Baru</InputLabel>
                        <Input.Password
                            name="passphrase"
                            placeholder="Masukkan Passphrase Baru"
                            onChange={handleChange}
                            value={data.passphrase}
                            className={clsx(
                                errors.passphrase && "border-red-500",
                                "py-2"
                            )}
                            required
                        />
                        <InputError message={errors.passphrase} />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <InputLabel required>Ulangi Passphrase</InputLabel>
                        <Input.Password
                            name="ulangi_passphrase"
                            placeholder="Ulangi Passphrase"
                            onChange={handleChange}
                            value={data.ulangi_passphrase}
                            className={clsx(
                                errors.ulangi_passphrase && "border-red-500",
                                "py-2"
                            )}
                            required
                        />
                        <InputError message={errors.ulangi_passphrase} />
                    </div>
                </>
            ) : !hasCertificate ? (
                <>
                    <div className="flex flex-col gap-2 w-full">
                        <InputLabel required>Passphrase</InputLabel>
                        <Input.Password
                            name="passphrase"
                            placeholder="Masukkan Passphrase"
                            onChange={handleChange}
                            value={data.passphrase}
                            className={clsx(
                                errors.passphrase && "border-red-500",
                                "py-2"
                            )}
                            required
                        />
                        <InputError message={errors.passphrase} />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <InputLabel required>Ulangi Passphrase</InputLabel>
                        <Input.Password
                            name="ulangi_passphrase"
                            placeholder="Ulangi Passphrase"
                            onChange={handleChange}
                            value={data.ulangi_passphrase}
                            className={clsx(
                                errors.ulangi_passphrase && "border-red-500",
                                "py-2"
                            )}
                            // required
                        />
                        <InputError message={errors.ulangi_passphrase} />
                    </div>
                </>
            ) : null}
            <ButtonSubmitForm reset={reset} processing={processing} />
        </form>
    );
}

export default FormSertifikat;
