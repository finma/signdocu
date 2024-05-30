import Icon from "@/Components/Atoms/Icon";
import InputError from "@/Components/Atoms/InputError";
import InputLabel from "@/Components/Atoms/InputLabel";
import ButtonSubmitForm from "@/Components/Molecules/Profil/ButtonSubmitForm";
import UseFormProfil from "@/Hooks/Profil/UseFormProfil";
import { Input } from "antd";
import clsx from "clsx";

function FormProfil({ profil }) {
    const {
        previewAvatar,
        handleChange,
        handleAvatarChange,
        submit,
        data,
        processing,
        errors,
        reset,
    } = UseFormProfil(profil);

    return (
        <form className="flex flex-col gap-3 mt-5" onSubmit={submit}>
            <div className="flex flex-col justify-center items-center">
                <InputError message={errors.avatar_update} />
                <div className="shadow-lg rounded-xl w-[150px] h-[150px] overflow-hidden">
                    {previewAvatar ? (
                        <img
                            src={URL.createObjectURL(data.avatar_update)}
                            className="w-full"
                        />
                    ) : (
                        <img
                            src={
                                profil.avatar
                                    ? profil.avatar
                                    : `https://ui-avatars.com/api/?name=${profil.name}&background=009B4D&color=fff`
                            }
                            alt={profil.name}
                            className="w-full"
                        />
                    )}
                </div>
                <div className="mt-6">
                    <input
                        id="avatar"
                        type="file"
                        className="hidden"
                        name="avatar"
                        onChange={handleAvatarChange}
                        accept="image/*"
                    />
                    <label htmlFor="avatar">
                        <span className="bg-transparent text-color-primary border border-color-primary group hover:bg-color-primary hover:text-white rounded-lg transition-all duration-200 py-2 px-4 cursor-pointer">
                            <Icon icon="image" me={2} />
                            Ubah Avatar
                        </span>
                    </label>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2 w-full">
                    <InputLabel required>Nama</InputLabel>
                    <Input
                        name="name"
                        placeholder="Masukkan Nama"
                        onChange={handleChange}
                        value={data.name}
                        className={clsx(
                            errors.name && "border-red-500",
                            "py-2"
                        )}
                        required
                    />
                    <InputError message={errors.name} />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <InputLabel required={!profil.social_lite}>
                        Email{" "}
                        {profil.social_lite ? (
                            <em className="text-[9px]">
                                (apabila login menggunakan google, email tidak
                                bisa diubah)
                            </em>
                        ) : null}
                    </InputLabel>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Masukkan Email"
                        onChange={handleChange}
                        value={data.email}
                        className={clsx(
                            errors.email && "border-red-500",
                            "py-2"
                        )}
                        required={!profil.social_lite}
                        disabled={profil.social_lite}
                    />
                    <InputError message={errors.email} />
                </div>
            </div>
            <ButtonSubmitForm reset={reset} processing={processing} />
        </form>
    );
}

export default FormProfil;
