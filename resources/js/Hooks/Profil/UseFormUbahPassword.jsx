import { useForm } from "@inertiajs/react";
import { toast } from "react-toastify";

const UseFormUbahPassword = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
        password_confirmation: "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("profil.submit_password"), {
            onSuccess: () => {
                toast.success("Password berhasil diubah.", {
                    theme: "colored",
                });
                reset();
            },
            onError: () => {
                toast.error("Gagal, periksa kembali form isiannya.", {
                    theme: "colored",
                });
            },
        });
    };

    return {
        data,
        processing,
        errors,
        reset,
        handleChange,
        submit,
    };
};

export default UseFormUbahPassword;
