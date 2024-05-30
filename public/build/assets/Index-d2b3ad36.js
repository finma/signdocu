import{r as l,h as z,j as a,F as v,a as e,b as U}from"./app-87882047.js";import{B as D}from"./Button-2a3e8570.js";import{I as k}from"./Icon-74cb44c4.js";import{v as I}from"./SignServices-94a29478.js";import{Q as M}from"./react-toastify.esm-801a0bbd.js";import{a as W,S}from"./Section-84195aa3.js";import{F as C}from"./Found-c01ad010.js";import{C as $}from"./ClipLoader-33f52da4.js";import{A as q}from"./AppContentLayout-9d50da8b.js";/* empty css                      */import"./clsx.m-1229b3e0.js";import"./sweetalert2.all-1005328a.js";import"./DetailDokumenItem-fc301b02.js";import"./GlobalFunction-0ae5579b.js";import"./InputFileViewer-083cf75d.js";import"./animation-f20c107f.js";import"./Dropdown-ff7981c9.js";import"./transition-8e202e22.js";const O=n=>{const[o,d]=l.useState(""),[r,x]=l.useState(!1),[u,y]=l.useState({}),[f,h]=l.useState(!1),[N,p]=l.useState(!1),[b,V]=l.useState(!1);l.useEffect(()=>{n.success&&M.success(n.success,{theme:"colored"})},[n]);const j=(t,i)=>{const c=t,s=document.createElement("a");s.href=c,s.download=i,s.click(),URL.revokeObjectURL(c)},A=()=>{const t=u.dokumen,i=`${u.perihal}.pdf`;j(t,i)};async function B(t){const i=new Web3(window.ethereum),c=await H(t);x(!0);try{const{data:s}=await F(c),g=s.blockchain_signature,m=s.ethereum_address.address,w=I(i,c,g);console.log(s),console.log({signerAddress:w}),console.log({address:m}),w.toLowerCase()===m.toLowerCase()?(p(!0),h(!0),y(s)):(p(!0),h(!1))}catch(s){console.log(s.response.data),p(!0),h(!1)}x(!1)}async function F(t){const{data:i}=await z(route("api.document.blockchain-hash",t));return i}function H(t){return new Promise((i,c)=>{const s=new Web3(window.ethereum),g=new FileReader;g.onload=function(m){const w=m.target.result,L=new Uint8Array(w),_=Array.from(L).map(R=>String.fromCharCode(R)).join(""),E=s.utils.sha3(_);i(E)},g.onerror=function(m){c(new Error("Error reading file: "+m))},g.readAsArrayBuffer(t)})}return{dokumen:o,setDokumen:d,dokumenData:u,loading:r,isVerified:f,showResult:N,showDocument:b,setShowDocument:V,documentVerification:B,handleDownload:A}},P=({signedBy:n,ethAddress:o,documentHash:d,signatureHash:r})=>a(v,{children:[e(W,{title:"Blockchain Signature"}),a("div",{className:"flex flex-col gap-3 -mt-3",children:[a("div",{className:"flex flex-col",children:[e("span",{className:"font-medium",children:"Status"}),a("div",{className:"border border-green-500 rounded-lg w-[150px] px-2 py-1 text-green-500 text-center bg-green-500/5",children:[e(k,{icon:"check-circle-fill",me:2}),"Document Valid"]})]}),a("div",{className:"flex flex-col",children:[e("span",{className:"font-medium",children:"Signed By"}),e("span",{children:n})]}),a("div",{className:"flex flex-col",children:[e("span",{className:"font-medium",children:"Ethereum Address"}),e("span",{className:"break-words",children:o})]}),a("div",{className:"flex flex-col",children:[e("span",{className:"font-medium",children:"Document Hash"}),e("span",{className:"break-words",children:d})]}),a("div",{className:"flex flex-col",children:[e("span",{className:"font-medium",children:"Signature Hash"}),e("span",{className:"break-words",children:r})]})]})]}),Q=({flash:n})=>{const{dokumen:o,setDokumen:d,dokumenData:r,loading:x,isVerified:u,showResult:y,showDocument:f,setShowDocument:h,documentVerification:N,handleDownload:p}=O(n);return a(v,{children:[a("div",{className:"flex flex-col gap-3 justify-end",children:[e("div",{className:"relative w-full",children:e("input",{type:"file",name:"dokumen",onChange:b=>d(b.target.files[0]),placeholder:"Masukkan Hash Dokumen",className:"pl-4 pr-4 py-3 w-full rounded-lg border border-gray-200 bg-gray-50 outline-none focus:border-color-primary",required:!0})}),e(D,{size:"sm",type:"submit",disabled:!o,onClick:()=>N(o),children:x?a("div",{className:"flex justify-center gap-2",children:[e($,{color:"#fff",size:15}),e("span",{children:"Submit"})]}):a(v,{children:[e(k,{icon:"send",me:2,className:"text-sm"}),"Submit"]})})]}),e("hr",{className:"my-5"}),y?u?a("div",{className:"flex flex-col gap-5",children:[e(P,{signedBy:r.ethereum_address.user.name,ethAddress:r.ethereum_address.address,documentHash:r.blockchain_document_hash,signatureHash:r.blockchain_signature}),e(D,{outline:!0,size:"sm",className:"w-full",onClick:()=>h(!f),children:f?a("div",{className:"flex justify-center gap-3",children:[e("span",{children:"Sembunyikan Detail Dokumen"}),e(k,{icon:"chevron-up"})]}):a("div",{className:"flex justify-center gap-3",children:[e("span",{children:"Munculkan Detail Dokumen"}),e(k,{icon:"chevron-down"})]})}),f?e(C,{documents:r,handleDownload:p}):null]}):e("div",{className:"border border-color-primary px-5 py-10 rounded-lg bg-color-primary/5",children:a("div",{className:"flex flex-col justify-center items-center gap-5",children:[e(k,{icon:"x-circle",style:{fontSize:"50px"},className:"text-color-primary"}),e("span",{className:"text-color-primary font-medium",children:"Dokumen tidak terverifikasi / tidak valid"})]})}):null]})},T=Q;function ue({title:n,document:o,filtered:d,flash:r}){return a(q,{active:n,title:n,children:[e(U,{title:n}),a("div",{className:"flex flex-col gap-5",children:[e(S,{title:"Verifikasi Dokumen",children:e(T,{flash:r})}),o?e(S,{children:e(C,{documents:o,handleDownload})}):null]})]})}export{ue as default};