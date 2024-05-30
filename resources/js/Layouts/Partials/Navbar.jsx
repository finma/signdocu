import ApplicationLogo from "@/Components/Atoms/ApplicationLogoText";
import Dropdown from "@/Components/Atoms/Dropdown";
import Icon from "@/Components/Atoms/Icon";
import { checkMetamaskIsConnected } from "@/Services/SignServices";
import { Link } from "@inertiajs/react";
import { Popover } from "antd";
import clsx from "clsx";
import { useEffect, useState } from "react";

function Navbar({ auth, title, connectedMetamask = false }) {
    const [metamask, setMetamask] = useState({});

    const checkMetamask = () => {
        const isConnected = checkMetamaskIsConnected();
        setMetamask(isConnected);
    };
    useEffect(() => {
        checkMetamask();
    }, []);
    return (
        <div className="bg-color-primary">
            <div className="h-[65px] flex justify-between items-center px-5 lg:px-0 container mx-auto lg:w-[1000px]">
                {title ? (
                    <Link
                        href={
                            title === "Riwayat Detail"
                                ? route("riwayat.index")
                                : route("home")
                        }
                    >
                        <Icon
                            icon="arrow-left"
                            className="text-white text-2xl"
                        />
                    </Link>
                ) : (
                    <ApplicationLogo />
                )}
                <div className="flex items-center gap-2">
                    {connectedMetamask || metamask.isConnected ? (
                        <Popover
                            content={`Ethereum Address : ${metamask.address}`}
                            title="Connected to Metamask"
                        >
                            <div className="rounded-full w-[40px] h-[40px] flex justify-center items-center group-hover:bg-white transition duration-300">
                                <img
                                    src="/images/logo_metamask.png"
                                    alt="logo metamask"
                                />
                            </div>
                        </Popover>
                    ) : null}
                    {auth.user ? (
                        <Dropdown>
                            <Dropdown.Trigger>
                                <div className="flex items-center justify-end gap-3 md:w-[165px] group cursor-pointer">
                                    <div>
                                        {auth.user.avatar ? (
                                            <div className="rounded-full w-[40px] h-[40px] flex justify-center items-center group-hover:bg-white transition duration-300 overflow-hidden">
                                                <img
                                                    src={auth.user.avatar}
                                                    alt={auth.user.name}
                                                />
                                            </div>
                                        ) : (
                                            <div className="border border-white rounded-full w-[40px] h-[40px] flex justify-center items-center group-hover:bg-white transition duration-300 overflow-hidden">
                                                <img
                                                    src={`https://ui-avatars.com/api/?name=${auth.user.name}&background=009B4D&color=fff`}
                                                    alt={auth.user.name}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <span className="hidden md:block text-white text-xs">
                                        {auth.user.name}
                                    </span>
                                </div>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link
                                    href={route("profil.index")}
                                    className={clsx(
                                        auth.user.roles[0].name ===
                                            "Super Admin" && "hidden"
                                    )}
                                >
                                    Profil
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    ) : (
                        <Link href={route("login")}>
                            <div className="border border-white rounded-full w-[40px] h-[40px] flex justify-center items-center cursor-pointer hover:bg-white group transition duration-300">
                                <Icon
                                    icon="person"
                                    className="text-white group-hover:text-color-primary text-xl transition duration-300"
                                />
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
