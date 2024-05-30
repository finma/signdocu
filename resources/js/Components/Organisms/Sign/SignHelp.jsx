import ApplicationLogoImage from "@/Components/Atoms/ApplicationLogoImage";
import Icon from "@/Components/Atoms/Icon";
import React from "react";

function SignHelp() {
    return (
        <>
            <div className="bg-yellow-100 p-3 rounded-xl flex lg:flex-col gap-3">
                <Icon icon="file-earmark-pdf" className="text-3xl" />
                <span>
                    File yang diizinkan untuk melakukan tanda tangan digital
                    adalah yang berekstensi <strong>.pdf</strong>
                </span>
            </div>
            {/* <div className="hidden lg:block ">
                <div className="flex flex-col justify-center h-auto mt-10 gap-5 md:py-10">
                    <div className="flex justify-center">
                        <ApplicationLogoImage />
                    </div>
                </div>
            </div> */}
        </>
    );
}

export default SignHelp;
