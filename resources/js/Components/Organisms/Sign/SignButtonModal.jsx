import Button from "@/Components/Atoms/Button";
import Icon from "@/Components/Atoms/Icon";

function SignButtonModal({ disabled=false, handleModalClose }) {
    return (
        <div className="flex justify-center gap-5">
            <Button
                size="sm"
                variant="danger"
                className="w-[150px]"
                onClick={handleModalClose}
            >
                <Icon icon="x-lg" className="me-2 text-sm" />
                Batal
            </Button>
            <Button type="submit" size="sm" className="w-[150px]" disabled={disabled}>
                <Icon icon="pencil-square" className="me-2 text-sm" />
                Tanda Tangan
            </Button>
        </div>
    );
}

export default SignButtonModal;
