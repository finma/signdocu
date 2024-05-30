import SectionTitle from "@/Components/Atoms/SectionTitle";
import clsx from "clsx";
import React from "react";

function Section({ title, children, isVerifikasi = false, className }) {
    return (
        <div
            className={clsx(
                !isVerifikasi ? "md:bg-gray-50" : "bg-white",
                "px-5 md:py-5 md:rounded-2xl"
            )}
        >
            {title ? <SectionTitle title={title} /> : null}
            <article className={clsx(className, "text-xs")}>{children}</article>
        </div>
    );
}

export default Section;
