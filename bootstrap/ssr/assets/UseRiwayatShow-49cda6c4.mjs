import { useEffect } from "react";
import { toast } from "react-toastify";
function UseRiwayatShow(flash, documents) {
  useEffect(() => {
    if (flash.success) {
      toast.success(flash.success, {
        theme: "colored"
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
    const data = documents.dokumen;
    const filename = `${documents.perihal}.pdf`;
    downloadFile(data, filename);
  };
  return {
    handleDownload
  };
}
export {
  UseRiwayatShow as U
};
