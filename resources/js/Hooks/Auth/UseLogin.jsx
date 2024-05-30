import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "react-toastify";

const UseLogin = () => {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: "",
    });

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    useEffect(() => {
        if (errors.email) {
            toast.error(errors.email, {
                theme: "colored",
            });
        }
        if (errors.password) {
            toast.error(errors.password, {
                theme: "colored",
            });
        }
    }, [errors]);
    
    return {
        data,
        processing,
        errors,
        handleOnChange,
        submit,
    };
};

export default UseLogin;
