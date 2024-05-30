import { a as jsx, j as jsxs } from "../ssr.mjs";
import { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import clsx from "clsx";
function Modal({
  children,
  show = false,
  maxWidth = "2xl",
  closeable = true,
  onClose = () => {
  }
}) {
  const close = () => {
    if (closeable) {
      onClose();
    }
  };
  const maxWidthClass = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl",
    "1000px": "sm:max-w-[1000px]",
    "1500px": "sm:max-w-[1500px]"
  }[maxWidth];
  return /* @__PURE__ */ jsx(Transition, { show, as: Fragment, leave: "duration-200", children: /* @__PURE__ */ jsxs(
    Dialog,
    {
      as: "div",
      id: "modal",
      className: "fixed inset-0 flex overflow-y-auto px-4 py-6 sm:px-0 items-center z-50 transform transition-all text-xs",
      onClose: close,
      children: [
        /* @__PURE__ */ jsx(
          Transition.Child,
          {
            as: Fragment,
            enter: "ease-out duration-300",
            enterFrom: "opacity-0",
            enterTo: "opacity-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/50" })
          }
        ),
        /* @__PURE__ */ jsx(
          Transition.Child,
          {
            as: Fragment,
            enter: "ease-out duration-300",
            enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            enterTo: "opacity-100 translate-y-0 sm:scale-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
            leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            children: /* @__PURE__ */ jsx(
              Dialog.Panel,
              {
                className: `mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-full sm:mx-auto ${maxWidthClass}`,
                children
              }
            )
          }
        )
      ]
    }
  ) });
}
function Header({ className, children, ...props }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        className,
        "flex justify-between items-center h-12 px-5 border-b text-gray-500"
      ),
      children: [
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-base", children }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("button", { type: "button", ...props, children: /* @__PURE__ */ jsx("i", { className: "bi bi-x-lg py-2 px-3 rounded-lg hover:bg-slate-100" }) }) })
      ]
    }
  );
}
function Body({ className, children }) {
  return /* @__PURE__ */ jsx("div", { className: clsx(className, "px-5 mb-"), children });
}
function Footer({ className, children }) {
  return /* @__PURE__ */ jsx("div", { className: clsx(className, "px-5 py-3 border-t"), children });
}
Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
export {
  Modal as M
};
