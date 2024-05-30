
function SectionTitle({ title }) {
    return (
        <h3 className="text-base md:text-xl font-semibold mb-5">
            <span className="border-b-4 border-color-secondary">{title}</span>
        </h3>
    );
}

export default SectionTitle;
