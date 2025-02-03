"use client";
import { Card, CardContent } from "@/components/ui/card";
import { LANDING_PAGE_MENU } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type MenuProps = {
  orientation: "mobile" | "desktop";
};

export const useNavigation = () => {
  const pathname = usePathname();
  const [section, setSection] = useState<string>(pathname);
  useEffect(() => {
    setSection(pathname);
  }, [pathname]);

  const onSetSection = (path: string) => {
    setSection(path);
  };

  return {
    section,
    onSetSection,
  };
};

const Menu = ({ orientation }: MenuProps) => {
  // const { section, onSetSection } = useNavigation();
  const pathname = usePathname();

  switch (orientation) {
    case "desktop":
      return (
        <Card className="bg-themeGray border-themeGray bg-clip-padding backdrop--blur__safari backdrop-filter backdrop-blur-2xl bg-opacity-60 p-1 lg:flex hidden rounded-xl">
          <CardContent className="p-0 flex gap-2">
            {LANDING_PAGE_MENU.map((menuItem) => (
              <Link
                href={menuItem.path}
                onClick={() => menuItem.path} // <-- Ensure all items set section
                className={cn(
                  "rounded-lg flex gap-2 py-2 px-4 items-center",
                  pathname == menuItem.path
                    ? "bg-gradient-to-br from-purple-500 to-purple-300 shadow-inner"
                    : ""
                )}
                key={menuItem.id}
              >
                {menuItem.icon}
                {menuItem.label}
              </Link>
            ))}
          </CardContent>
        </Card>
      );

    case "mobile":
      return (
        <div className="flex flex-col mt-10">
          {LANDING_PAGE_MENU.map((menuItem) => (
            <Link
              href={menuItem.path}
              onClick={() => menuItem.path} // <-- Ensure all items set section
              className={cn(
                "rounded-xl flex gap-2 py-2 px-4 items-center",
                pathname == menuItem.path
                  ? "bg-gradient-to-br from-purple-500 to-white border-[#27272A]"
                  : ""
              )}
              key={menuItem.id}
            >
              {menuItem.icon}
              {menuItem.label}
            </Link>
          ))}
        </div>
      );
    default:
      return <></>;
  }
};

export default Menu;
function useEffect(arg0: () => void, arg1: any[]) {
  // throw new Error("Function not implemented.");
}
