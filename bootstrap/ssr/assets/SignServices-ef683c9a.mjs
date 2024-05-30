import axios from "axios";
import Swal from "sweetalert2";
async function createEthereumAddress(formData) {
  const { data } = await axios.post(route("api.ethereum.store"), formData);
  return data;
}
async function metaMaskDetect() {
  if (typeof window.ethereum !== "undefined" || typeof window.web3 !== "undefined") {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });
    if (accounts.length > 0) {
      window.ethereum.enable().then((accounts2) => {
        const userAddress = accounts2[0];
        createEthereumAddress({
          address: userAddress
        });
      });
    } else {
      console.log("Tidak ada akun yang terhubung.");
    }
  } else {
    Swal.fire({
      title: "Perhatian!",
      text: "Browser anda belum terinstall metamask, anda tidak bisa melakukan tanda tangan digital.",
      icon: "error",
      confirmButtonText: "Mengerti",
      confirmButtonColor: "#07bc0c"
    });
    setDisabledSelectFile(true);
  }
}
async function signDocument(web3, documentHash, account) {
  const signature = await web3.eth.personal.sign(documentHash, account);
  return signature;
}
function verifySignature(web3, documentHash, signature) {
  const signerAddress = web3.eth.accounts.recover(documentHash, signature);
  return signerAddress;
}
export {
  metaMaskDetect as m,
  signDocument as s,
  verifySignature as v
};
