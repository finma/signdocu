import clsx from "clsx";
import Icon from "../Atoms/Icon";

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
        setParams({ ...params, page: page });
        setFetching(true);
    };

    const pageDisabled = (label) => {
        if (data.current_page === 1 && label === "&laquo; Sebelumnya") {
            return true;
        } else if (
            data.current_page === data.last_page &&
            label === "Berikutnya &raquo;"
        ) {
            return true;
        }
    };

    return (
        <div className="flex justify-end gap-2 mt-5">
            {data.links.map((link, i) => (
                <button
                    key={i}
                    className={clsx(
                        link.active &&
                            "border-color-primary text-white bg-color-primary",
                        pageDisabled(link.label)
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "hover:border-color-primary hover:text-color-primary focus:text-white focus:bg-color-primary",
                        "border rounded-lg transition-all duration-300 w-[35px] h-[35px] text-xs"
                    )}
                    onClick={() => handlePagination(link.label)}
                    disabled={pageDisabled(link.label)}
                >
                    {link.label === "&laquo; Sebelumnya" ? (
                        <Icon icon="chevron-left" size="xs" />
                    ) : link.label === "Berikutnya &raquo;" ? (
                        <Icon icon="chevron-right" size="xs" />
                    ) : (
                        link.label
                    )}
                </button>
            ))}
        </div>
    );
}

export default Pagination;
