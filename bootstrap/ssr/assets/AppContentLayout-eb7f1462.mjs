import { a as jsx, j as jsxs } from "../ssr.mjs";
import { Link, usePage } from "@inertiajs/react";
import { A as ApplicationLogo, D as Dropdown } from "./Dropdown-c2fd1bd2.mjs";
import { I as Icon } from "./Icon-ec6848f5.mjs";
import clsx from "clsx";
import "react";
import { PiSignatureLight } from "react-icons/pi/index.esm.js";
import { ToastContainer } from "react-toastify";
function Navbar({ auth, title, active }) {
  return /* @__PURE__ */ jsx("div", { className: "bg-color-primary", children: /* @__PURE__ */ jsxs("div", { className: "h-[65px] flex justify-between items-center px-5 lg:px-0 container mx-auto lg:w-[1000px]", children: [
    title ? /* @__PURE__ */ jsx(
      Link,
      {
        href: title === "Riwayat Detail" ? route("riwayat.index") : route("home"),
        children: /* @__PURE__ */ jsx(
          Icon,
          {
            icon: "arrow-left",
            className: "text-white text-2xl"
          }
        )
      }
    ) : /* @__PURE__ */ jsx(ApplicationLogo, {}),
    title ? /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("span", { className: "font-semibold text-white text-xl", children: title }) }) : null,
    auth.user ? /* @__PURE__ */ jsxs(Dropdown, { children: [
      /* @__PURE__ */ jsx(Dropdown.Trigger, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-3 md:w-[165px] group cursor-pointer", children: [
        /* @__PURE__ */ jsx("div", { children: auth.user.avatar ? /* @__PURE__ */ jsx("div", { className: "rounded-full w-[40px] h-[40px] flex justify-center items-center group-hover:bg-white transition duration-300 overflow-hidden", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: auth.user.avatar,
            alt: auth.user.name
          }
        ) }) : /* @__PURE__ */ jsx("div", { className: "border border-white rounded-full w-[40px] h-[40px] flex justify-center items-center group-hover:bg-white transition duration-300 overflow-hidden", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: `https://ui-avatars.com/api/?name=${auth.user.name}&background=009B4D&color=fff`,
            alt: auth.user.name
          }
        ) }) }),
        /* @__PURE__ */ jsx("span", { className: "hidden md:block text-white text-xs", children: auth.user.name })
      ] }) }),
      /* @__PURE__ */ jsxs(Dropdown.Content, { children: [
        /* @__PURE__ */ jsx(
          Dropdown.Link,
          {
            href: route("profil.index"),
            className: clsx(
              auth.user.roles[0].name === "Super Admin" && "hidden"
            ),
            children: "Profil"
          }
        ),
        /* @__PURE__ */ jsx(
          Dropdown.Link,
          {
            href: route("logout"),
            method: "post",
            as: "button",
            children: "Log Out"
          }
        )
      ] })
    ] }) : /* @__PURE__ */ jsx(Link, { href: route("login"), children: /* @__PURE__ */ jsx("div", { className: "border border-white rounded-full w-[40px] h-[40px] flex justify-center items-center cursor-pointer hover:bg-white group transition duration-300", children: /* @__PURE__ */ jsx(
      Icon,
      {
        icon: "person",
        className: "text-white group-hover:text-color-primary text-xl transition duration-300"
      }
    ) }) })
  ] }) });
}
function BottomNavigationItem({
  href = route("home"),
  icon,
  label,
  isActive = false,
  className
}) {
  return /* @__PURE__ */ jsxs(Link, { href, className: clsx(className, "flex flex-col gap-1 items-center"), children: [
    icon === "pencil-square" ? /* @__PURE__ */ jsx(PiSignatureLight, { className: clsx(isActive && "text-color-primary", "text-[32px]") }) : /* @__PURE__ */ jsx(
      Icon,
      {
        icon,
        className: clsx(
          isActive && "text-color-primary",
          "text-2xl"
        )
      }
    ),
    /* @__PURE__ */ jsx(
      "span",
      {
        className: clsx(
          isActive && "text-color-primary font-medium",
          "-mt-1 text-xs"
        ),
        children: label
      }
    )
  ] });
}
const bottomNavigationMenus = [
  {
    name: "Home",
    href: "/home",
    icon: "house"
  },
  {
    name: "Sign",
    href: "/sign",
    icon: "pencil-square"
  },
  {
    name: "Riwayat",
    href: "/riwayat",
    icon: "clock-history"
  },
  {
    name: "Profil",
    href: "/profil",
    icon: "person"
  }
];
const bottomNavigationMenusAdmin = [
  {
    name: "Home",
    href: "/home",
    icon: "house"
  },
  {
    name: "Riwayat",
    href: "/riwayat",
    icon: "clock-history"
  },
  {
    name: "Statistik",
    href: "/statistik",
    icon: "graph-up-arrow"
  },
  {
    name: "Verifikasi",
    href: "/verifikasi",
    icon: "check2-square"
  }
];
const accessMenus = [
  {
    name: "Sign",
    href: "/sign",
    icon: "pencil-square"
  },
  {
    name: "Riwayat",
    href: "/riwayat",
    icon: "clock-history"
  },
  // {
  //     name: "Statistik",
  //     href: "/statistik",
  //     icon: "graph-up-arrow",
  // },
  {
    name: "Verifikasi",
    href: "/verifikasi",
    icon: "check2-square"
  },
  {
    name: "Profil",
    href: "/profil",
    icon: "person"
  },
  {
    name: "About",
    href: "/about",
    icon: "info-circle"
  }
];
function BottomNavigation({ auth, active = "Home" }) {
  return /* @__PURE__ */ jsx("footer", { className: "md:hidden fixed bottom-0 w-full flex items-center h-[65px] bg-white shadow-2xl", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto flex justify-around px-5 ", children: auth.user && auth.user.roles[0].name === "Super Admin" ? bottomNavigationMenusAdmin.map((menu, i) => {
    var _a, _b;
    return /* @__PURE__ */ jsx(
      BottomNavigationItem,
      {
        icon: menu.icon,
        href: menu.href,
        label: menu.name,
        isActive: active === menu.name,
        className: clsx(
          (auth.user && ((_a = auth.user.roles[0]) == null ? void 0 : _a.name) === "Super Admin" && menu.name === "Sign" || auth.user && ((_b = auth.user.roles[0]) == null ? void 0 : _b.name) === "Super Admin" && menu.name === "Profil") && "hidden"
        )
      },
      i
    );
  }) : bottomNavigationMenus.map((menu, i) => /* @__PURE__ */ jsx(
    BottomNavigationItem,
    {
      icon: menu.icon,
      href: menu.href,
      label: menu.name,
      isActive: active === menu.name
    },
    i
  )) }) });
}
function AppContentLayout({ children, title, active }) {
  const { props } = usePage();
  const { auth } = props;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col sm:pt-0 bg-gray-50 md:bg-gray-200", children: [
    /* @__PURE__ */ jsxs("div", { className: "w-full h-auto bg-gray-200 overflow-hidden text-gray-500 text-sm", children: [
      /* @__PURE__ */ jsx(Navbar, { auth, title, active }),
      /* @__PURE__ */ jsx("div", { className: "relative bg-gray-50 lg:bg-gray-200 container mx-auto lg:w-[1000px] h-full md:h-auto", children: /* @__PURE__ */ jsx("main", { className: "flex flex-col pt-7 pb-24 md:py-5", children }) }),
      /* @__PURE__ */ jsx(BottomNavigation, { active, auth })
    ] }),
    /* @__PURE__ */ jsx(ToastContainer, {})
  ] });
}
export {
  AppContentLayout as A,
  accessMenus as a
};
