import Button from "@/Components/Atoms/Button";
import Icon from "@/Components/Atoms/Icon";

function SignButtonNav({disabled=false, handleModalOpen, file, resetFile}) {
    return (
        <div className="flex justify-between gap-5 mb-15">
            <Button size="sm" variant="danger" className="w-[150px]" onClick={resetFile} disabled={!file}>
                <Icon icon="arrow-clockwise" className="me-2 text-sm"/>
                Reset File
            </Button>
            <Button size="sm" className="w-[150px]" onClick={handleModalOpen} disabled={disabled}>
                <Icon icon="arrow-right" className="me-2 text-sm"/>
                Lanjutkan
            </Button>
        </div>
    );
}

export default SignButtonNav;
