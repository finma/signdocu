import Button from "@/Components/Atoms/Button";
import Icon from "@/Components/Atoms/Icon";
import Section from "@/Layouts/Partials/Section";
import { Link } from "@inertiajs/react";

function SectionInformasiTtd({ auth, certificate }) {
    return (
        <Section title="Digital Signature in Blockchain">
            {auth.user ? (
                certificate ? (
                    <div className="bg-green-100 p-3 rounded-xl">
                        <div className="flex items-center gap-3">
                            <Icon
                                icon="check2-circle"
                                className="text-color-primary text-3xl"
                            />
                            <span>
                                Halo <span className="font-semibold">{auth.user.name}</span>, Anda sudah memiliki sertifikat dan sudah bisa
                                melakukan tanda tangan secara digital.
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="bg-yellow-100 p-3 rounded-xl">
                        <span>
                            Untuk dapat melakukan tanda tangan digital, Anda
                            harus membuat sertifikat terlebih dahulu
                        </span>
                        <div className="mt-3">
                            <Link href={route('profil.index', {
                                tab: "sertifikat"
                            })}>
                                <Button size="sm">
                                    <Icon
                                        icon="key"
                                        me={2}
                                        className="text-white text-lg"
                                    />
                                    Buat Sertifikat
                                </Button>
                            </Link>
                        </div>
                    </div>
                )
            ) : (
                <div className="bg-red-100 p-3 rounded-xl">
                    <span>
                        Anda harus{" "}
                        <Link
                            href={route("login")}
                            className="text-color-primary font-medium hover:underline"
                        >
                            login
                        </Link>{" "}
                        terlebih dahulu untuk melihat section ini
                    </span>
                </div>
            )}
        </Section>
    );
}

export default SectionInformasiTtd;
