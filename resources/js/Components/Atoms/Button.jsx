import clsx from "clsx";
import Icon from "./Icon";

function Button({
    className,
    size = "md",
    variant = "primary",
    outline = false,
    children,
    disabled = false,
    warning = false,
    ...props
}) {
    let sizeButton;
    if (size == "md") {
        sizeButton = "px-5 h-[50px]";
    } else if (size == "sm") {
        sizeButton = "px-4 h-[38px]";
    }

    let variantButton;
    if (variant == "primary") {
        if (outline) {
            variantButton =
                "bg-transparent text-color-primary border border-color-primary hover:bg-color-primary group hover:bg-color-primary hover:text-white";
        } else {
            variantButton =
                "bg-color-primary text-white border border-color-primary hover:bg-color-primary-hover";
        }
    } else if (variant == "danger") {
        variantButton = "bg-red-500 text-white hover:bg-red-600";
    }
    return (
        <button
            type="button"
            className={clsx(
                className,
                sizeButton,
                variantButton,
                disabled &&
                    (outline ? "bg-gray-200" : "opacity-75 cursor-not-allowed"),
                "rounded-lg transition-all duration-200 relative"
            )}
            disabled={disabled}
            {...props}
        >
            {warning ? (
                <div className="absolute -top-2 -right-2 bg-red-500 w-[18px] h-[18px] rounded-full flex justify-center items-center">
                    <Icon icon="exclamation" className="text-lg text-white" />
                </div>
            ) : null}
            {children}
        </button>
    );
}

export default Button;
