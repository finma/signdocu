import Button from "@/Components/Atoms/Button";
import InputLabel from "@/Components/Atoms/InputLabel";
import SectionTitle from "@/Components/Atoms/SectionTitle";
import TextInput from "@/Components/Atoms/TextInput";

function SignQrUpdateForm({ updateQrCode, qrCode, pageRef, XRef, YRef }) {
    return (
        <div className="flex flex-col gap-2">
            <SectionTitle title="Atur Posisi QRCode" />
            <form
                onSubmit={updateQrCode}
                className="grid grid-cols-4 items-end gap-2"
            >
                <div className="flex flex-col gap-1">
                    <InputLabel>Page</InputLabel>
                    <TextInput
                        type="number"
                        placeholder="Page"
                        defaultValue={qrCode.page}
                        ref={pageRef}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <InputLabel>Koordinat X</InputLabel>
                    <TextInput
                        min={0}
                        type="number"
                        placeholder="Koordinat X"
                        defaultValue={qrCode.x}
                        ref={XRef}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <InputLabel>Koordinat Y</InputLabel>
                    <TextInput
                        min={0}
                        type="number"
                        placeholder="Koordinat Y"
                        defaultValue={qrCode.y}
                        ref={YRef}
                    />
                </div>
                <Button size="sm" type="submit">
                    Update
                </Button>
            </form>
        </div>
    );
}

export default SignQrUpdateForm;
