import { a as jsx } from "../ssr.mjs";
import { forwardRef, useRef, useEffect } from "react";
const TextInput = forwardRef(function TextInput2({ type = "text", className = "", isFocused = false, ...props }, ref) {
  const input = ref ? ref : useRef();
  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      type,
      className: "border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 rounded-md " + className,
      ref: input
    }
  );
});
export {
  TextInput as T
};
