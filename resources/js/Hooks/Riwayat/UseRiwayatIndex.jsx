import { router } from "@inertiajs/react";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function UseRiwayatIndex(filtered) {
    const [params, setParams] = useState(filtered);
    const [fetching, setFetching] = useState(false);

    const handleSearch = (value) => {
        setParams({ ...params, page: 1, q: value });
        setFetching(true);
    };

    const request = useCallback(
        debounce((query) => {
            router.get(
                route("riwayat.index"),
                { ...query },
                {
                    preserveState: true,
                    preserveScroll: true,
                }
            );
        }, 150),
        []
    );

    useEffect(() => {
        if (fetching) {
            request(params);
        }
    }, [params, fetching]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Data akan dihapus secara permanen.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Hapus",
            cancelButtonText: "Batal",
            confirmButtonColor: "#EF4444",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                // Tambahkan logika penghapusan data di sini
                router.delete(
                    route("riwayat.destroy", {
                        document: id,
                    }),
                    {
                        onSuccess: () => {
                            toast.success("Dokumen berhasil dihapus.", {
                                theme: "colored",
                            });
                        },
                    }
                );
            }
        });
    };

    return {
        params,
        setParams,
        setFetching,
        handleSearch,
        handleDelete,
    };
}

export default UseRiwayatIndex;
