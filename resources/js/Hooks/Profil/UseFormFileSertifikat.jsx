import { useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function UseFormFileSertifikat() {
    const { props } = usePage();
    const { auth } = props;

    const { data, setData, post, processing, errors, reset } = useForm({
        file_crt: "",
        file_key: "",
        file_p12: "",
    });

    const [errorClients, setErrorClients] = useState({
        file_crt: "",
        file_key: "",
        file_p12: "",
    });

    const handleChange = (e) => {
        setData(
            e.target.name,
            e.target.type === "file" ? e.target.files[0] : e.target.value
        );
    };

    // validasi dari sisi client
    useEffect(() => {
        if (data.file_crt !== "") {
            const file_crt = data.file_crt.name.split(".").pop();

            // Cek ekstensi file
            if (["crt"].includes(file_crt)) {
                setErrorClients({ ...errorClients, file_crt: "" }); // Bersihkan pesan error
            } else {
                setErrorClients({
                    ...errorClients,
                    file_crt: "Hanya file berekstensi .crt yang diizinkan.",
                });
            }
        }

        if (data.file_p12 !== "") {
            const file_p12 = data.file_p12.name.split(".").pop();

            // Cek ekstensi file
            if (["p12"].includes(file_p12)) {
                setErrorClients({ ...errorClients, file_p12: "" }); // Bersihkan pesan error
            } else {
                setErrorClients({
                    ...errorClients,
                    file_p12: "Hanya file berekstensi .p12 yang diizinkan.",
                });
            }
        }

        if (data.file_key !== "") {
            const file_key = data.file_key.name.split(".").pop();

            // Cek ekstensi file
            if (["key"].includes(file_key)) {
                setErrorClients({ ...errorClients, file_key: "" }); // Bersihkan pesan error
            } else {
                setErrorClients({
                    ...errorClients,
                    file_key: "Hanya file berekstensi .key yang diizinkan.",
                });
            }
        }
    }, [data]);


    console.log(data);
    console.log(errorClients);

    const submit = (e) => {
        e.preventDefault();

        post(route("profil.submit_file_sertifikat"), {
            onSuccess: () => {
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
        auth,
        handleChange,
        submit,
        data,
        processing,
        errors,
        reset,
        errorClients
    };
}

export default UseFormFileSertifikat;
