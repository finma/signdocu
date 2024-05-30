import Icon from "@/Components/Atoms/Icon";
import { Tooltip } from "antd";

function RiwayatDelete({ ...props }) {
    return (
        <div className="absolute bottom-3 right-0 w-[50px] text-center" {...props}>
            <Tooltip title="Hapus" placement="top">
                <span>
                    <Icon
                        icon="trash"
                        className="text-xl cursor-pointer text-red-500 hover:text-red-700"
                    />
                </span>
            </Tooltip>
        </div>
    );
}

export default RiwayatDelete;
