import Icon from "@/Components/Atoms/Icon";
import SectionTitle from "@/Components/Atoms/SectionTitle";
import React from "react";

const DataBlockChainSignature = ({signedBy, ethAddress, documentHash, signatureHash}) => {
    return (
        <>
            <SectionTitle title="Blockchain Signature" />
            <div className="flex flex-col gap-3 -mt-3">
                <div className="flex flex-col">
                    <span className="font-medium">Status</span>
                    <div className="border border-green-500 rounded-lg w-[150px] px-2 py-1 text-green-500 text-center bg-green-500/5">
                        <Icon icon="check-circle-fill" me={2} />
                        Document Valid
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="font-medium">Signed By</span>
                    <span>{signedBy}</span>
                </div>
                <div className="flex flex-col">
                    <span className="font-medium">Ethereum Address</span>
                    <span className="break-words">
                        {ethAddress}
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="font-medium">Document Hash</span>
                    <span className="break-words">
                        {documentHash}
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="font-medium">Signature Hash</span>
                    <span className="break-words">
                        {signatureHash}
                    </span>
                </div>
            </div>
        </>
    );
};

export default DataBlockChainSignature;
