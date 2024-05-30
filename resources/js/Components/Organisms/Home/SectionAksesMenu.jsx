import Icon from "@/Components/Atoms/Icon";
import { accessMenus } from "@/Dictionaries/Menu";
import Section from "@/Layouts/Partials/Section";
import { Link } from "@inertiajs/react";
import clsx from "clsx";
import "flickity/css/flickity.css";
import { PiSignatureLight } from "react-icons/pi";

function SectionAksesMenu({ auth }) {
    return (
        <Section title="Akses Menu">
            <div className="grid grid-cols-4 md:flex gap-x-7 gap-y-5">
                {accessMenus.map((menu, i) => (
                    <Link
                        key={i}
                        href={menu.href}
                        className={clsx(
                            ((auth.user && auth.user.roles[0].name === "Super Admin" &&
                                menu.name === "Sign") ||
                                (auth.user && auth.user.roles[0].name === "Super Admin" &&
                                    menu.name === "Profil")) &&
                                "hidden",
                            "text-center w-[70px] h-auto"
                        )}
                    >
                        <div>
                            <div className="border border-color-secondary rounded-xl flex justify-center items-center mb-2 w-[70px] h-[70px] hover:bg-gray-100">
                                {menu.icon === "pencil-square" ? (
                                    <PiSignatureLight className="text-[35px] text-color-primary" />
                                ) : (
                                    <Icon
                                        icon={menu.icon}
                                        className="text-3xl text-color-primary"
                                    />
                                )}
                            </div>
                        </div>
                        <span>{menu.name}</span>
                    </Link>
                ))}
            </div>
        </Section>
    );
}

export default SectionAksesMenu;
