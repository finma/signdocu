import { j as jsxs, a as jsx } from "../ssr.mjs";
import clsx from "clsx";
import { I as Icon } from "./Icon-ec6848f5.mjs";
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
      variantButton = "bg-transparent text-color-primary border border-color-primary hover:bg-color-primary group hover:bg-color-primary hover:text-white";
    } else {
      variantButton = "bg-color-primary text-white border border-color-primary hover:bg-color-primary-hover";
    }
  } else if (variant == "danger") {
    variantButton = "bg-red-500 text-white hover:bg-red-600";
  }
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      className: clsx(
        className,
        sizeButton,
        variantButton,
        disabled && (outline ? "bg-gray-200" : "opacity-75 cursor-not-allowed"),
        "rounded-lg transition-all duration-200 relative"
      ),
      disabled,
      ...props,
      children: [
        warning ? /* @__PURE__ */ jsx("div", { className: "absolute -top-2 -right-2 bg-red-500 w-[18px] h-[18px] rounded-full flex justify-center items-center", children: /* @__PURE__ */ jsx(Icon, { icon: "exclamation", className: "text-lg text-white" }) }) : null,
        children
      ]
    }
  );
}
export {
  Button as B
};
