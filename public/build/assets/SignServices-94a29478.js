import{h as s}from"./app-87882047.js";import{S as r}from"./sweetalert2.all-1005328a.js";async function o(t){const{data:e}=await s.post(route("api.ethereum.store"),t);return e}async function c(){typeof window.ethereum<"u"||typeof window.web3<"u"?(await window.ethereum.request({method:"eth_requestAccounts"})).length>0?window.ethereum.enable().then(e=>{const n=e[0];o({address:n})}):console.log("Tidak ada akun yang terhubung."):(r.fire({title:"Perhatian!",text:"Browser anda belum terinstall metamask, anda tidak bisa melakukan tanda tangan digital.",icon:"error",confirmButtonText:"Mengerti",confirmButtonColor:"#07bc0c"}),setDisabledSelectFile(!0))}async function d(t,e,n){return await t.eth.personal.sign(e,n)}function m(t,e,n){return t.eth.accounts.recover(e,n)}export{c as m,d as s,m as v};