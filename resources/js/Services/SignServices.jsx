import axios from "axios";
import Swal from "sweetalert2";

export async function createEthereumAddress(formData) {
    const { data } = await axios.post(route("api.ethereum.store"), formData);
    return data;
}

export async function metaMaskDetect(
    setConnectedMetamask,
    setDisabledSelectFile
) {
    // Deteksi Metamask
    if (
        typeof window.ethereum !== "undefined" ||
        typeof window.web3 !== "undefined"
    ) {
        // Mintai izin untuk mengakses akun
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        // Mintai izin untuk terhubung dengan Metamask

        if (accounts.length > 0) {
            window.ethereum.enable().then((accounts) => {
                const userAddress = accounts[0]; // Alamat Ethereum pengguna

                // simpan ethereum address ke database
                createEthereumAddress({
                    address: userAddress,
                });
                setConnectedMetamask(true);
            });
        } else {
            console.log("Tidak ada akun yang terhubung.");
            setDisabledSelectFile(true);
        }
    } else {
        Swal.fire({
            title: "Perhatian!",
            text: "Browser anda belum terinstall metamask, anda tidak bisa melakukan tanda tangan digital.",
            icon: "error",
            confirmButtonText: "Mengerti",
            confirmButtonColor: "#07bc0c",
            footer: '<a target="_blank" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded" href="https://metamask.io/download/">Install Metamask</a>'
        });
        setDisabledSelectFile(true);
    }
}

// cek koneksi ke metamask
export const checkMetamaskIsConnected = () => {
    if (
        typeof window.ethereum !== "undefined" ||
        typeof window.web3 !== "undefined"
    ) {
        if (window.ethereum.selectedAddress) {
            return {
                isConnected: true,
                address: window.ethereum.selectedAddress,
            };
        } else {
            return {
                isConnected: false,
            };
        }
    } else {
        return {
            isConnected: false,
        };
    }
};

export function getFileHash(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (event) {
            const arrayBuffer = event.target.result;
            const hashArray = Array.from(new Uint8Array(arrayBuffer));
            const hashHex =
                "0x" +
                hashArray
                    .map((byte) => byte.toString(16).padStart(2, "0"))
                    .join("");
            resolve(hashHex);
        };

        reader.onerror = function (error) {
            reject(new Error("Error reading file for hashing: " + error));
        };

        reader.readAsArrayBuffer(file);
    });
}

export async function signDocument(web3, documentHash, account) {
    // const documentHash = web3.utils.sha3(document);
    const signature = await web3.eth.personal.sign(documentHash, account);
    return signature;
}

export function verifySignature(web3, documentHash, signature) {
    // const messageHash = web3.utils.sha3(message);
    const signerAddress = web3.eth.accounts.recover(documentHash, signature);
    return signerAddress;
}
