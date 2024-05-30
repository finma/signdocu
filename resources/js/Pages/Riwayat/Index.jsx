import Icon from "@/Components/Atoms/Icon";
import Pagination from "@/Components/Molecules/Paginatin";
import RiwayatDelete from "@/Components/Molecules/Riwayat/RiwayatDelete";
import RiwayatItem from "@/Components/Molecules/Riwayat/RiwayatItem";
import UseRiwayatIndex from "@/Hooks/Riwayat/UseRiwayatIndex";
import AppContentLayout from "@/Layouts/AppContentLayout";
import Section from "@/Layouts/Partials/Section";
import { Head } from "@inertiajs/react";
import clsx from "clsx";
import { DebounceInput } from "react-debounce-input";
import "react-toastify/dist/ReactToastify.css";

export default function Riwayat({ title, histories, filtered }) {
    const { params, setParams, setFetching, handleSearch, handleDelete } =
        UseRiwayatIndex(filtered);

    return (
        <AppContentLayout active={title} title={title}>
            <Head title={title} />

            <Section
                title={title}
                className="md:min-h-[700px] flex flex-col justify-between"
            >
                <div className="flex flex-col gap-3">
                    <div className="flex justify-end">
                        <div className="relative w-full">
                            <Icon
                                icon="search"
                                className="absolute top-3 left-3 text-gray-400"
                            />
                            <DebounceInput
                                type="search"
                                minLength={2}
                                debounceTimeout={300}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Cari Dokumen..."
                                className="pl-8 pr-4 py-3 w-full rounded-lg border border-gray-200 bg-gray-50 outline-none focus:border-color-primary"
                            />
                        </div>
                    </div>
                    <div
                        className={clsx(
                            histories.total === 0
                                ? "justify-center items-center"
                                : "md:grid grid-cols-2",
                            "flex flex-col gap-3 w-full"
                        )}
                    >
                        {histories.total > 0 ? (
                            histories.data.map((history) => (
                                <div key={history.id} className="relative">
                                    <RiwayatItem history={history} />
                                    <RiwayatDelete
                                        onClick={() => handleDelete(history.id)}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center">
                                <img
                                    src="/images/files.svg"
                                    alt="not found"
                                    className="w-[250px]"
                                />
                                <span className="text-sm">
                                    Tidak ada riwayat ditemukan.
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                {histories.total > 0 ? (
                    <Pagination
                        data={histories}
                        params={params}
                        setParams={setParams}
                        setFetching={setFetching}
                    />
                ) : null}
            </Section>
        </AppContentLayout>
    );
}
