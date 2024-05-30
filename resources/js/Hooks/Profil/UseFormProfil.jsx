import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-toastify";

function UseFormProfil(profil) {
    const [previewAvatar, setPreviewAvatar] = useState("");

    const { data, setData, post, processing, errors, reset } = useForm({
        name: profil.name,
        email: profil.email,
        avatar: profil.avatar,
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleAvatarChange = (e) => {
        setData("avatar_update", e.target.files[0]);
        setPreviewAvatar(true);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("profil.submit_profil"), {
            onSuccess: () => {
                toast.success("Profil berhasil diperbaharui.", {
                    theme: "colored",
                });
            },
            onError: () => {
                toast.error("Gagal, periksa kembali form isiannya.", {
                    theme: "colored",
                });
            },
        });
    };

    return {
        previewAvatar,
        handleChange,
        handleAvatarChange,
        submit,
        data,
        processing,
        errors,
        reset,
    };
}

export default UseFormProfil;
