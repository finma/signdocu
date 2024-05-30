import BottomNavigationItem from "@/Components/Atoms/BottomNavigationItem";
import {
    bottomNavigationMenus,
    bottomNavigationMenusAdmin,
} from "@/Dictionaries/Menu";
import clsx from "clsx";

function BottomNavigation({ auth, active = "Home" }) {
    return (
        <footer className="md:hidden fixed bottom-0 w-full flex items-center h-[65px] bg-white shadow-2xl">
            <div className="container mx-auto flex justify-around px-5 ">
                {auth.user && auth.user.roles[0].name === "Super Admin"
                    ? bottomNavigationMenusAdmin.map((menu, i) => (
                          <BottomNavigationItem
                              key={i}
                              icon={menu.icon}
                              href={menu.href}
                              label={menu.name}
                              isActive={active === menu.name}
                              className={clsx(
                                  ((auth.user && auth.user.roles[0]?.name === "Super Admin" &&
                                      menu.name === "Sign") ||
                                      (auth.user && auth.user.roles[0]?.name ===
                                          "Super Admin" &&
                                          menu.name === "Profil")) &&
                                      "hidden"
                              )}
                          />
                      ))
                    : bottomNavigationMenus.map((menu, i) => (
                          <BottomNavigationItem
                              key={i}
                              icon={menu.icon}
                              href={menu.href}
                              label={menu.name}
                              isActive={active === menu.name}
                          />
                      ))}
            </div>
        </footer>
    );
}

export default BottomNavigation;
