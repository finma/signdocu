import { Link } from "@inertiajs/react";

export default function ApplicationLogoText() {
    return (
        <Link href={route("home")}>
            <div className="font-semibold text-2xl">
                <span className="text-white">Sign</span>
                <span className="text-color-secondary">Docu</span>
            </div>
        </Link>
    );
}
