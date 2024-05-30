import { a as jsx, j as jsxs } from "../ssr.mjs";
import { I as Icon } from "./Icon-ec6848f5.mjs";
import clsx from "clsx";
import { Tooltip } from "antd";
import { c as cutString, a as formatDateString } from "./GlobalFunction-42b33f59.mjs";
import { Link, router, Head } from "@inertiajs/react";
import { debounce } from "lodash";
import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { A as AppContentLayout } from "./AppContentLayout-eb7f1462.mjs";
import { S as Section } from "./Section-0e98acee.mjs";
import { DebounceInput } from "react-debounce-input";
/* empty css                         */import "react/jsx-runtime";
import "react-dom/server";
import "@inertiajs/react/server";
import "./Dropdown-c2fd1bd2.mjs";
import "@headlessui/react";
import "react-icons/pi/index.esm.js";
function Pagination({ data, params, setParams, setFetching }) {
  const handlePagination = (value) => {
    let page;
    if (value === "&laquo; Sebelumnya") {
      page = data.current_page - 1;
    } else if (value === "Berikutnya &raquo;") {
      page = data.current_page + 1;
    } else {
      page = value;
    }
    setParams({ ...params, page });
    setFetching(true);
  };
  const pageDisabled = (label) => {
    if (data.current_page === 1 && label === "&laquo; Sebelumnya") {
      return true;
    } else if (data.current_page === data.last_page && label === "Berikutnya &raquo;") {
      return true;
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "flex justify-end gap-2 mt-5", children: data.links.map((link, i) => /* @__PURE__ */ jsx(
    "button",
    {
      className: clsx(
        link.active && "border-color-primary text-white bg-color-primary",
        pageDisabled(link.label) ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "hover:border-color-primary hover:text-color-primary focus:text-white focus:bg-color-primary",
        "border rounded-lg transition-all duration-300 w-[35px] h-[35px] text-xs"
      ),
      onClick: () => handlePagination(link.label),
      disabled: pageDisabled(link.label),
      children: link.label === "&laquo; Sebelumnya" ? /* @__PURE__ */ jsx(Icon, { icon: "chevron-left", size: "xs" }) : link.label === "Berikutnya &raquo;" ? /* @__PURE__ */ jsx(Icon, { icon: "chevron-right", size: "xs" }) : link.label
    },
    i
  )) });
}
function RiwayatDelete({ ...props }) {
  return /* @__PURE__ */ jsx("div", { className: "absolute bottom-3 right-0 w-[50px] text-center", ...props, children: /* @__PURE__ */ jsx(Tooltip, { title: "Hapus", placement: "top", children: /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(
    Icon,
    {
      icon: "trash",
      className: "text-xl cursor-pointer text-red-500 hover:text-red-700"
    }
  ) }) }) });
}
function RiwayatItem({ history }) {
  return /* @__PURE__ */ jsxs(
    Link,
    {
      href: route("riwayat.show", history.hash),
      className: "flex gap-3 items-center border rounded-xl p-3 hover:bg-gray-100",
      children: [
        /* @__PURE__ */ jsx("div", { className: "w-1/6 lg:w-2/12", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: history.qrcode,
            alt: history.perihal,
            className: "w-[75px]"
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 w-5/6 lg:w-10/12", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium text-sm", children: cutString(history.perihal, 75) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-2", children: [
            /* @__PURE__ */ jsx(Icon, { icon: "person-check" }),
            /* @__PURE__ */ jsx("span", { children: history.signer.user.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-2", children: [
            /* @__PURE__ */ jsx(Icon, { icon: "calendar-check" }),
            /* @__PURE__ */ jsx("span", { children: formatDateString(history.signed_at) })
          ] })
        ] })
      ]
    }
  );
}
function UseRiwayatIndex(filtered) {
  const [params, setParams] = useState(filtered);
  const [fetching, setFetching] = useState(false);
  const handleSearch = (value) => {
    setParams({ ...params, page: 1, q: value });
    setFetching(true);
  };
  const request = useCallback(
    debounce((query) => {
      router.get(
        route("riwayat.index"),
        { ...query },
        {
          preserveState: true,
          preserveScroll: true
        }
      );
    }, 150),
    []
  );
  useEffect(() => {
    if (fetching) {
      request(params);
    }
  }, [params, fetching]);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data akan dihapus secara permanen.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#EF4444",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(
          route("riwayat.destroy", {
            document: id
          }),
          {
            onSuccess: () => {
              toast.success("Dokumen berhasil dihapus.", {
                theme: "colored"
              });
            }
          }
        );
      }
    });
  };
  return {
    params,
    setParams,
    setFetching,
    handleSearch,
    handleDelete
  };
}
function Riwayat({ title, histories, filtered }) {
  const { params, setParams, setFetching, handleSearch, handleDelete } = UseRiwayatIndex(filtered);
  return /* @__PURE__ */ jsxs(AppContentLayout, { active: title, title, children: [
    /* @__PURE__ */ jsx(Head, { title }),
    /* @__PURE__ */ jsxs(
      Section,
      {
        title,
        className: "md:min-h-[700px] flex flex-col justify-between",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full", children: [
              /* @__PURE__ */ jsx(
                Icon,
                {
                  icon: "search",
                  className: "absolute top-3 left-3 text-gray-400"
                }
              ),
              /* @__PURE__ */ jsx(
                DebounceInput,
                {
                  type: "search",
                  minLength: 2,
                  debounceTimeout: 300,
                  onChange: (e) => handleSearch(e.target.value),
                  placeholder: "Cari Dokumen...",
                  className: "pl-8 pr-4 py-3 w-full rounded-lg border border-gray-200 bg-gray-50 outline-none focus:border-color-primary"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: clsx(
                  histories.total === 0 ? "justify-center items-center" : "md:grid grid-cols-2",
                  "flex flex-col gap-3 w-full"
                ),
                children: histories.total > 0 ? histories.data.map((history) => /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(RiwayatItem, { history }),
                  /* @__PURE__ */ jsx(
                    RiwayatDelete,
                    {
                      onClick: () => handleDelete(history.id)
                    }
                  )
                ] }, history.id)) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: "/images/files.svg",
                      alt: "not found",
                      className: "w-[250px]"
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Tidak ada riwayat ditemukan." })
                ] })
              }
            )
          ] }),
          histories.total > 0 ? /* @__PURE__ */ jsx(
            Pagination,
            {
              data: histories,
              params,
              setParams,
              setFetching
            }
          ) : null
        ]
      }
    )
  ] });
}
export {
  Riwayat as default
};
