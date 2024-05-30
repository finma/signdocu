import { Link } from "@inertiajs/react";

export default function ApplicationLogoImage({ width = 175 }) {
    return (
        <Link href={route("home")}>
            <img
                src="/images/logo.png"
                alt="logo"
                style={{ width: `${width}px` }}
            />
        </Link>
    );
}
