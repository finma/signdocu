import InputLabel from "@/Components/Atoms/InputLabel";
import Modal from "@/Components/Atoms/Modal";
import { Input } from "antd";
import SignButtonModal from "./SignButtonModal";
import InputError from "@/Components/Atoms/InputError";
import clsx from "clsx";

function ModalPassphrase({
    modalOpen,
    submit,
    handleModalClose,
    handleChange,
    data,
    errors
}) {
    return (
        <Modal show={modalOpen}>
            <form className="flex flex-col gap-5" onSubmit={submit}>
                <Modal.Header onClick={handleModalClose}>
                    Tanda Tangani Dokumen
                </Modal.Header>
                <Modal.Body className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2 w-full">
                        <InputLabel required>Perihal</InputLabel>
                        <Input
                            name="perihal"
                            placeholder="Masukkan Perihal"
                            onChange={handleChange}
                            defaultValue={data.perihal}
                            className={clsx(
                                errors.perihal && "border-red-500", "py-2")}
                            required
                        />
                        <InputError message={errors.perihal} />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <InputLabel required>Passphrase</InputLabel>
                        <Input.Password
                            name="passphrase"
                            placeholder="Masukkan Passphrase"
                            onChange={handleChange}
                            className="py-2"
                            required
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <SignButtonModal
                        disabled={
                            !data.perihal || !data.passphrase || data.passphrase.length < 6
                        }
                        handleModalClose={handleModalClose}
                    />
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default ModalPassphrase;
