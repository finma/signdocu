import { j as jsxs, a as jsx, F as Fragment } from "../ssr.mjs";
import { B as Button } from "./Button-409c7599.mjs";
import { I as Icon } from "./Icon-ec6848f5.mjs";
import { I as InputError } from "./InputError-fcb315b9.mjs";
import { A as AppLayout } from "./AppLayout-4341c344.mjs";
import { useForm, Head, Link } from "@inertiajs/react";
import { Input } from "antd";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import "react/jsx-runtime";
import "react-dom/server";
import "@inertiajs/react/server";
import "clsx";
import "react-toastify";
function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);
  const handleOnChange = (event) => {
    setData(
      event.target.name,
      event.target.type === "checkbox" ? event.target.checked : event.target.value
    );
  };
  const submit = (e) => {
    e.preventDefault();
    post(route("register"));
  };
  return /* @__PURE__ */ jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Daftar" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center gap-5 h-full md:py-10", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: "/images/login.svg",
          alt: "login",
          className: "img-fluid lg:w-[70%] mx-auto"
        }
      ),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Daftar" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5", children: [
        /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "flex flex-col gap-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx(
              Input,
              {
                name: "name",
                size: "large",
                placeholder: "Nama",
                prefix: /* @__PURE__ */ jsx(Icon, { icon: "person", me: 2 }),
                onChange: handleOnChange,
                status: errors.name ? "error" : null,
                value: data.name,
                required: true
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx(
              Input,
              {
                name: "email",
                size: "large",
                placeholder: "Email",
                prefix: /* @__PURE__ */ jsx(Icon, { icon: "envelope-at", me: 2 }),
                onChange: handleOnChange,
                status: errors.email ? "error" : null,
                value: data.email,
                required: true
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.email })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx(
              Input.Password,
              {
                name: "password",
                size: "large",
                placeholder: "Password",
                prefix: /* @__PURE__ */ jsx(Icon, { icon: "lock", me: 2 }),
                onChange: handleOnChange,
                status: errors.password ? "error" : null,
                value: data.password,
                required: true
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.password })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx(
              Input.Password,
              {
                name: "password_confirmation",
                size: "large",
                placeholder: "Ulangi Password",
                prefix: /* @__PURE__ */ jsx(Icon, { icon: "lock", me: 2 }),
                onChange: handleOnChange,
                status: errors.password_confirmation ? "error" : null,
                value: data.password_confirmation,
                required: true
              }
            ),
            /* @__PURE__ */ jsx(
              InputError,
              {
                message: errors.password_confirmation
              }
            )
          ] }),
          /* @__PURE__ */ jsx(Button, { size: "sm", type: "submit", children: processing ? /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-2", children: [
            /* @__PURE__ */ jsx(ClipLoader, { color: "#fff", size: 15 }),
            /* @__PURE__ */ jsx("span", { children: "Daftar" })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              Icon,
              {
                icon: "pencil-square",
                me: 2,
                className: "text-base"
              }
            ),
            "Daftar"
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-5 text-center", children: /* @__PURE__ */ jsxs("span", { children: [
          "Sudah memiliki akun?",
          " ",
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("login"),
              className: "text-color-primary font-semibold",
              children: "Login"
            }
          )
        ] }) })
      ] })
    ] })
  ] });
}
export {
  Register as default
};
