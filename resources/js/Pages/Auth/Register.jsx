import Button from "@/Components/Atoms/Button";
import Icon from "@/Components/Atoms/Icon";
import InputError from "@/Components/Atoms/InputError";
import AppLayout from "@/Layouts/AppLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Input } from "antd";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

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

        post(route("register"));
    };

    return (
        <AppLayout>
            <Head title="Daftar" />

            <div className="flex flex-col justify-center gap-5 h-full md:py-10">
                <img
                    src="/images/login.svg"
                    alt="login"
                    className="img-fluid lg:w-[70%] mx-auto"
                />
                <div>
                    <h1 className="text-2xl font-bold">Daftar</h1>
                </div>
                <div className="flex flex-col gap-5">
                    <form onSubmit={submit} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <Input
                                name="name"
                                size="large"
                                placeholder="Nama"
                                prefix={<Icon icon="person" me={2} />}
                                onChange={handleOnChange}
                                status={errors.name ? "error" : null}
                                value={data.name}
                                required
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Input
                                name="email"
                                size="large"
                                placeholder="Email"
                                prefix={<Icon icon="envelope-at" me={2} />}
                                onChange={handleOnChange}
                                status={errors.email ? "error" : null}
                                value={data.email}
                                required
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Input.Password
                                name="password"
                                size="large"
                                placeholder="Password"
                                prefix={<Icon icon="lock" me={2} />}
                                onChange={handleOnChange}
                                status={errors.password ? "error" : null}
                                value={data.password}
                                required
                            />
                            <InputError message={errors.password} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Input.Password
                                name="password_confirmation"
                                size="large"
                                placeholder="Ulangi Password"
                                prefix={<Icon icon="lock" me={2} />}
                                onChange={handleOnChange}
                                status={
                                    errors.password_confirmation
                                        ? "error"
                                        : null
                                }
                                value={data.password_confirmation}
                                required
                            />
                            <InputError
                                message={errors.password_confirmation}
                            />
                        </div>
                        <Button size="sm" type="submit">
                            {processing ? (
                                <div className="flex justify-center gap-2">
                                    <ClipLoader color="#fff" size={15} />
                                    <span>Daftar</span>
                                </div>
                            ) : (
                                <>
                                    <Icon
                                        icon="pencil-square"
                                        me={2}
                                        className="text-base"
                                    />
                                    Daftar
                                </>
                            )}
                        </Button>
                    </form>
                    <div className="mt-5 text-center">
                        <span>
                            Sudah memiliki akun?{" "}
                            <Link
                                href={route("login")}
                                className="text-color-primary font-semibold"
                            >
                                Login
                            </Link>
                            {/* <button
                                onClick={() =>
                                    toast.success("Berhasil log out!", {
                                        theme: "colored",
                                    })
                                }
                            >
                                Login
                            </button> */}
                        </span>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
