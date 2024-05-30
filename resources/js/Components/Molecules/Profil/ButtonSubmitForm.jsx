import Button from "@/Components/Atoms/Button";
import Icon from "@/Components/Atoms/Icon";
import { ClipLoader } from "react-spinners";

function ButtonSubmitForm({ reset, processing, disabled=false }) {
    return (
        <div className="flex gap-3 mt-2">
            <Button onClick={() => reset()} size="sm" variant="danger">
                <Icon icon="arrow-clockwise" me={2} className="text-sm" /> Reset
            </Button>
            <Button type="submit" size="sm" disabled={disabled}>
                {processing ? (
                    <div className="flex justify-center gap-2">
                        <ClipLoader color="#fff" size={15} />
                        <span>Simpan</span>
                    </div>
                ) : (
                    <>
                        <Icon icon="save" me={2} className="text-sm" /> Simpan
                    </>
                )}
            </Button>
        </div>
    );
}

export default ButtonSubmitForm;
