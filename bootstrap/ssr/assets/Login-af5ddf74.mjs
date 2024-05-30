import { j as jsxs, a as jsx, F as Fragment } from "../ssr.mjs";
import { B as Button } from "./Button-409c7599.mjs";
import { I as Icon } from "./Icon-ec6848f5.mjs";
import { useForm, Head, Link } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { A as AppLayout } from "./AppLayout-4341c344.mjs";
import { Input, Divider } from "antd";
import { ClipLoader } from "react-spinners";
/* empty css                         */import "react/jsx-runtime";
import "react-dom/server";
import "@inertiajs/react/server";
import "clsx";
const UseLogin = () => {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
    remember: ""
  });
  const handleOnChange = (event) => {
    setData(
      event.target.name,
      event.target.type === "checkbox" ? event.target.checked : event.target.value
    );
  };
  const submit = (e) => {
    e.preventDefault();
    post(route("login"));
  };
  useEffect(() => {
    if (errors.email) {
      toast.error(errors.email, {
        theme: "colored"
      });
    }
    if (errors.password) {
      toast.error(errors.password, {
        theme: "colored"
      });
    }
  }, [errors]);
  return {
    data,
    processing,
    errors,
    handleOnChange,
    submit
  };
};
const UseLogin$1 = UseLogin;
function Login() {
  const { data, processing, errors, handleOnChange, submit } = UseLogin$1();
  return /* @__PURE__ */ jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Welcome" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center gap-5 h-full md:py-10", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: "/images/login.svg",
          alt: "login",
          className: "img-fluid lg:w-[70%] mx-auto"
        }
      ),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Login" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5", children: [
        /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "flex flex-col gap-5", children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              name: "email",
              size: "large",
              placeholder: "Email",
              prefix: /* @__PURE__ */ jsx(Icon, { icon: "envelope-at", me: 2 }),
              onChange: handleOnChange,
              value: data.email
            }
          ),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "password",
              name: "password",
              size: "large",
              placeholder: "Password",
              prefix: /* @__PURE__ */ jsx(Icon, { icon: "lock", me: 2 }),
              onChange: handleOnChange,
              value: data.password
            }
          ),
          /* @__PURE__ */ jsx(Button, { size: "sm", type: "submit", children: processing ? /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-2", children: [
            /* @__PURE__ */ jsx(ClipLoader, { color: "#fff", size: 15 }),
            /* @__PURE__ */ jsx("span", { children: "Login" })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              Icon,
              {
                icon: "box-arrow-in-right",
                me: 2,
                className: "text-base"
              }
            ),
            "Login"
          ] }) })
        ] }),
        /* @__PURE__ */ jsx(Divider, { plain: true, children: /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Atau" }) }),
        /* @__PURE__ */ jsx("a", { href: route("login.google.index"), children: /* @__PURE__ */ jsx(Button, { outline: true, className: "w-full", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full group", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "/images/icon_google.png",
              alt: "google",
              className: "absolute w-[20px] left-5"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-color-primary group-hover:text-white", children: "Login dengan Google" })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "mt-5 text-center", children: /* @__PURE__ */ jsxs("span", { children: [
          "Belum memiliki akun?",
          " ",
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("register"),
              className: "text-color-primary font-semibold",
              children: "Daftar"
            }
          )
        ] }) })
      ] })
    ] })
  ] });
}
export {
  Login as default
};
