import { useForm, usePage } from "@inertiajs/react";
import { toast } from "react-toastify";

function UseFormSertifikat(hasCertificate) {
    const { props } = usePage();
    const { auth } = props;

    const { data, setData, post, processing, errors, reset } = useForm({
        ubah_passphrase: null,
        lembaga: hasCertificate ? hasCertificate.lembaga : "",
        jabatan: hasCertificate ? hasCertificate.jabatan : "",
        passphrase: "",
        // passphrase_lama: "",
        ulangi_passphrase: "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleCheckboxChange = (e) => {
        if (e.target.checked) {
            setData(e.target.name, 1);
        } else {
            setData(e.target.name, null);
        }
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("profil.submit_sertifikat"), {
            onSuccess: () => {
                setData({
                    ...data,
                    ubah_passphrase: null,
                    passphrase: "",
                    // passphrase_lama: "",
                    ulangi_passphrase: "",
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
        auth,
        handleChange,
        handleCheckboxChange,
        submit,
        data,
        processing,
        errors,
        reset,
    };
}

export default UseFormSertifikat;
