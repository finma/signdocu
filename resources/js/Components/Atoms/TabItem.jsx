import clsx from "clsx";
import Icon from "./Icon";

function TabItem({
    isActive = false,
    hasCertificate = false,
    label,
    className,
    children,
    ...props
}) {
    return (
        <button
            className={clsx(
                className,
                isActive ? "text-white bg-color-primary" : "text-color-primary",
                " px-5 py-2 border border-color-primary rounded-t-lg flex items-center gap-2"
            )}
            {...props}
        >
            {label}
            {!hasCertificate && label === "Sertifikat" ? (
                <Icon
                    icon="exclamation-circle"
                    className={clsx(isActive ? "text-white" : "text-red-500")}
                />
            ) : null}
        </button>
    );
}

export default TabItem;
