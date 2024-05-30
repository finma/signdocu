export const serialNumber = (currentPage, perPage, index) => {
    return (currentPage - 1) * perPage + index + 1;
};

export const cutString = (string, jumlah) => {
    let afix;
    if (jumlah < string.length) {
        afix = "...";
    } else {
        afix = "";
    }
    return string.slice(0, jumlah) + afix;
};

export function formatDateString(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const monthNames = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];
    const month = monthNames[monthIndex];

    const formattedDate = `${day} ${month} ${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return `${formattedDate}, ${formattedTime} WIB`;
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const monthNames = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];
    const month = monthNames[monthIndex];

    const formattedDate = `${day} ${month} ${year}`;

    return `${formattedDate}`;
}

