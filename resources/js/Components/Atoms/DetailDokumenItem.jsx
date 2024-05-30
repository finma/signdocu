function DetailDokumenItem({ width = 110, label, value }) {
    return (
        <tr className="align-top">
            <td width={width} className="font-medium">
                {label}
            </td>
            <td width={10}>:</td>
            <td>{value}</td>
        </tr>
    );
}

export default DetailDokumenItem;
