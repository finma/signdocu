import Button from "@/Components/Atoms/Button";
import Icon from "@/Components/Atoms/Icon";
import UseLogin from "@/Hooks/Auth/UseLogin";
import AppLayout from "@/Layouts/AppLayout";
import { Head, Link } from "@inertiajs/react";
import { Divider, Input } from "antd";
import { ClipLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
    const { data, processing, errors, handleOnChange, submit } = UseLogin();

    return (
        <AppLayout>
            <Head title="Welcome" />

            <div className="flex flex-col justify-center gap-5 h-full md:py-10">
                <img
                    src="/images/login.svg"
                    alt="login"
                    className="img-fluid lg:w-[70%] mx-auto"
                />
                <div>
                    <h1 className="text-2xl font-bold">Login</h1>
                </div>
                <div className="flex flex-col gap-5">
                    <form onSubmit={submit} className="flex flex-col gap-5">
                        <Input
                            name="email"
                            size="large"
                            placeholder="Email"
                            prefix={<Icon icon="envelope-at" me={2} />}
                            onChange={handleOnChange}
                            value={data.email}
                            required
                        />
                        <Input
                            type="password"
                            name="password"
                            size="large"
                            placeholder="Password"
                            prefix={<Icon icon="lock" me={2} />}
                            onChange={handleOnChange}
                            value={data.password}
                            required
                        />
                        <Button size="sm" type="submit">
                            {/* Login */}
                            {processing ? (
                                <div className="flex justify-center gap-2">
                                    <ClipLoader color="#fff" size={15} />
                                    <span>Login</span>
                                </div>
                            ) : (
                                <>
                                    <Icon
                                        icon="box-arrow-in-right"
                                        me={2}
                                        className="text-base"
                                    />
                                    Login
                                </>
                            )}
                        </Button>
                    </form>
                    {/* <Divider plain>
                        <span className="text-gray-400">Atau</span>
                    </Divider>
                    <a href={route("login.google.index")}>
                        <Button outline className="w-full">
                            <div className="relative w-full group">
                                <img
                                    src="/images/icon_google.png"
                                    alt="google"
                                    className="absolute w-[20px] left-5"
                                />
                                <span className="text-color-primary group-hover:text-white">
                                    Login dengan Google
                                </span>
                            </div>
                        </Button>
                    </a> */}
                    <div className="mt-5 text-center">
                        <span>
                            Belum memiliki akun?{" "}
                            <Link
                                href={route("register")}
                                className="text-color-primary font-semibold"
                            >
                                Daftar
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
