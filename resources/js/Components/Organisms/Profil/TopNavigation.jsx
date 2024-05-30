import TabItem from "@/Components/Atoms/TabItem";

function TopNavigation({ active = "profil", setActiveTab, hasCertificate }) {
    const tabs = [
        {
            label: "Akun",
            slug: "profil",
        },
        {
            label: "Sertifikat",
            slug: "sertifikat",
        },
        {
            label: "Ubah Password",
            slug: "ubah-password",
        },
    ];
    
    const handleNavigation = (tab) => {
        setActiveTab(tab)
    };
    return (
        <div className="flex gap-2 border-b pb-2">
            {tabs.map((tab) => (
                <TabItem
                    key={tab.slug}
                    isActive={active == tab.slug}
                    onClick={() => handleNavigation(tab.slug)}
                    label={tab.label}
                    hasCertificate={hasCertificate}
                />
            ))}
        </div>
    );
}

export default TopNavigation;
