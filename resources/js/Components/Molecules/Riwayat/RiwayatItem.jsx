import Icon from "@/Components/Atoms/Icon";
import { cutString, formatDateString } from "@/Utils/GlobalFunction";
import { Link } from "@inertiajs/react";

function RiwayatItem({ history }) {
    return (
        <Link
            href={route("riwayat.show", history.hash)}
            className="flex gap-3 items-center border rounded-xl p-3 hover:bg-gray-100"
        >
            {/* <div className="w-1/6 lg:w-2/12">
                <img
                    src={history.qrcode}
                    alt={history.perihal}
                    className="w-[75px]"
                />
            </div> */}
            <div className="flex flex-col gap-1 w-5/6 lg:w-10/12">
                <span className="font-medium text-sm">
                    {cutString(history.perihal, 75)}
                </span>
                <div className="flex items-end gap-2">
                    <Icon icon="person-check" />
                    <span>{history.signer.user.name}</span>
                </div>
                <div className="flex items-end gap-2">
                    <Icon icon="calendar-check" />
                    <span>{formatDateString(history.signed_at)}</span>
                </div>
            </div>
        </Link>
    );
}

export default RiwayatItem;
