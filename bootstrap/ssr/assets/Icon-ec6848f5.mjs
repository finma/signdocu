import { a as jsx } from "../ssr.mjs";
import clsx from "clsx";
function Icon({ icon, ms, me, className, ...props }) {
  return /* @__PURE__ */ jsx(
    "i",
    {
      className: clsx(
        ms && `ms-${ms}`,
        me && `me-${me}`,
        className,
        `bi bi-${icon}`
      ),
      ...props
    }
  );
}
export {
  Icon as I
};
