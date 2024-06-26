import { a as jsx } from "../ssr.mjs";
function InputError({ message, className = "", ...props }) {
  return message ? /* @__PURE__ */ jsx("p", { ...props, className: "text-red-500 -mt-1" + className, children: message }) : null;
}
export {
  InputError as I
};
