import InputError from "@/Components/Atoms/InputError";
import InputLabel from "@/Components/Atoms/InputLabel";
import ButtonSubmitForm from "@/Components/Molecules/Profil/ButtonSubmitForm";
import UseFormUbahPassword from "@/Hooks/Profil/UseFormUbahPassword";
import { Input } from "antd";
import clsx from "clsx";

function FormUbahPassword() {
    const { data, processing, errors, reset, handleChange, submit } = UseFormUbahPassword();

    return (
        <form onSubmit={submit} className="flex flex-col gap-3 mt-5">
            <div className="flex flex-col gap-2 w-full">
                <InputLabel required>Password</InputLabel>
                <Input.Password
                    name="password"
                    placeholder="Masukkan Password"
                    onChange={handleChange}
                    value={data.password}
                    className={clsx(
                        errors.password && "border-red-500",
                        "py-2"
                    )}
                    required
                />
                <InputError message={errors.password} />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <InputLabel required>Ulangi Password</InputLabel>
                <Input.Password
                    name="password_confirmation"
                    placeholder="Ulangi Password"
                    onChange={handleChange}
                    value={data.password_confirmation}
                    className={clsx(
                        errors.password_confirmation && "border-red-500",
                        "py-2"
                    )}
                    required
                />
                <InputError message={errors.password_confirmation} />
            </div>
            <ButtonSubmitForm reset={reset} processing={processing} />
        </form>
    );
}

export default FormUbahPassword;
