import { metaMaskDetect, signDocument } from "@/Services/SignServices";
import { useForm } from "@inertiajs/react";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { keccak256 } from "js-sha3";

function UseSign(flash, resetFile) {
    const [sign, setSign] = useState(false);
    const [connectedMetamask, setConnectedMetamask] = useState(false);
    const [disabledSelectFile, setDisabledSelectFile] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        perihal: "",
        passphrase: "",
        file: null,
    });
    const [file, setFile] = useState(null);

    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);
        setData("file", uploadedFile);
    };

    const handleChange = debounce((e) => {
        setData(e.target.name, e.target.value);
    }, 500);

    // blockchain
    useEffect(() => {
        metaMaskDetect(setConnectedMetamask, setDisabledSelectFile);
    }, []);

    async function signBlockchain() {
        // Inisialisasi web3 dengan penyedia Metamask
        const web3 = new Web3(window.ethereum);

        // Mintai izin untuk terhubung dengan Metamask
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const account = accounts[0];

        // Menandatangani pesan
        // const documentHash = await getFileHash(data.filePreview);

        // Mengunduh dan menghitung hash dari file
        const fileContent = await downloadFile(data.filePreview);
        const documentHash = web3.utils.sha3(fileContent);
        // console.log("document hash: ", documentHash);

        const signature = await signDocument(web3, documentHash, account);
        // console.log("raw", documentHash);
        console.log("raw: ", {
            sha3: documentHash,
            keccak256: keccak256(fileContent),
        });
        setData({
            ...data,
            blockchain_document_hash: documentHash,
            blockchain_signature: signature,
        });
    }

    async function downloadFile(url) {
        return fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.arrayBuffer();
            })
            .then((buffer) => {
                const uint8Array = new Uint8Array(buffer);
                const binaryString = Array.from(uint8Array)
                    .map((byte) => String.fromCharCode(byte))
                    .join("");
                return binaryString;
            });
    }

    useEffect(() => {
        if (sign) {
            signBlockchain();
            setSign(false);
        }
    }, [sign]);
    // end blockchain

    const submit = (e) => {
        e.preventDefault();
        setSign(true);
    };

    useEffect(() => {
        if (data.blockchain_signature?.length > 0) {
            post(route("sign.handle_sign"), {
                onError: () => {
                    handleModalClose();
                    toast.error("Gagal, silahkan cek kembali formnya.", {
                        theme: "colored",
                    });
                },
                preserveState: true,
                preserveScroll: true,
            });
            setData("blockchain_signature", null);
        }
    }, [data.blockchain_signature]);

    useEffect(() => {
        if (flash.error) {
            toast.error(flash.error, {
                theme: "colored",
            });
        }
        if (flash.success) {
            handleModalClose();
            reset();
            resetFile();
            toast.success(flash.success, {
                theme: "colored",
            });
        }
    }, [flash]);

    return {
        data,
        setData,
        processing,
        errors,
        reset,
        file,
        setFile,
        handleChange,
        handleFileChange,
        submit,
        modalOpen,
        handleModalOpen,
        handleModalClose,
        disabledSelectFile,
        connectedMetamask,
    };
}

export default UseSign;
