import { verifySignature } from "@/Services/SignServices";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { keccak256 } from "js-sha3";

const UseFormVerifikasi = (flash) => {
    const [dokumen, setDokumen] = useState("");
    const [loading, setLoading] = useState(false);
    const [dokumenData, setDokumenData] = useState({});
    const [isVerified, setIsVerified] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [showDocument, setShowDocument] = useState(false);

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success, {
                theme: "colored",
            });
        }
    }, [flash]);

    const downloadFile = (data, filename) => {
        const url = data;
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleDownload = () => {
        const data = dokumenData.dokumen;
        const filename = `${dokumenData.perihal}.pdf`;
        downloadFile(data, filename);
    };

    async function documentVerification(dokumen) {
        const web3 = new Web3(window.ethereum);

        const documentHash = await calculateFileHash(dokumen);

        setLoading(true);
        try {
            const { data } = await getDokumenByBlockchainHash(documentHash);

            const signature = data.blockchain_signature;
            const address = data.ethereum_address.address;

            const signerAddress = verifySignature(
                web3,
                documentHash,
                signature
            );
            console.log(data);
            console.log({ signerAddress: signerAddress });
            console.log({ address: address });

            if (signerAddress.toLowerCase() === address.toLowerCase()) {
                setShowResult(true);
                setIsVerified(true);
                setDokumenData(data);
            } else {
                setShowResult(true);
                setIsVerified(false);
            }
        } catch (error) {
            console.log(error.response.data);
            setShowResult(true);
            setIsVerified(false);
        }
        setLoading(false);
    }

    async function getDokumenByBlockchainHash(documentHash) {
        const { data } = await axios(
            route("api.document.blockchain-hash", documentHash)
        );

        return data;
    }

    function calculateFileHash(file) {
        return new Promise((resolve, reject) => {
            const web3 = new Web3(window.ethereum);
            const reader = new FileReader();

            reader.onload = function (event) {
                const arrayBuffer = event.target.result;
                const uint8Array = new Uint8Array(arrayBuffer);
                const binaryString = Array.from(uint8Array)
                    .map((byte) => String.fromCharCode(byte))
                    .join("");
                const hash = web3.utils.sha3(binaryString);
                console.log("calculate hash: ", {
                    sha3: hash,
                    keccak256: keccak256(binaryString),
                });
                resolve(hash);
            };

            reader.onerror = function (error) {
                reject(new Error("Error reading file: " + error));
            };

            reader.readAsArrayBuffer(file);
        });
    }

    return {
        dokumen,
        setDokumen,
        dokumenData,
        loading,
        isVerified,
        showResult,
        setShowResult,
        showDocument,
        setShowDocument,
        documentVerification,
        handleDownload,
    };
};

export default UseFormVerifikasi;
