import React from "react";
import Icon from "./Icon";
import { Link } from "@inertiajs/react";
import clsx from "clsx";
import { PiSignatureLight } from "react-icons/pi";

function BottomNavigationItem({
    href = route("home"),
    icon,
    label,
    isActive = false,
    className
}) {
    return (
        <Link href={href} className={clsx(className, "flex flex-col gap-1 items-center")}>
            {icon === "pencil-square" ? (
                <PiSignatureLight className={clsx(isActive && "text-color-primary", "text-[32px]")} />
            ) : (
                <Icon
                    icon={icon}
                    className={clsx(
                        isActive && "text-color-primary",
                        "text-2xl"
                    )}
                />
            )}
            {/* <Icon
                icon={icon}
                className={clsx(isActive && "text-color-primary", "text-2xl")}
            /> */}
            <span
                className={clsx(
                    isActive && "text-color-primary font-medium",
                    "-mt-1 text-xs"
                )}
            >
                {label}
            </span>
        </Link>
    );
}

export default BottomNavigationItem;
