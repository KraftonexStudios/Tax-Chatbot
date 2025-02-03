import GlassSheet from "@/components/global/glass-sheet";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import Menu from "./menu";
import { MenuIcon } from "lucide-react";


const LandingPageNavbar = () => {
  return (
    <div className="w-full flex justify-between sticky top-0 items-center py-5 px-[9vw] z-50">
      <p className="font-bold text-2xl">TaxGenie</p>
      <Menu orientation="desktop" />
      <div className="flex gap-2">
        <Link href="/">
          <Button
            variant="outline"
            className="bg-themeBlack rounded-2xl flex gap-2 border-themeGray hover:bg-themeGray"
          >
            <LogOut />
            Login
          </Button>
        </Link>
        <GlassSheet
          triggerClass="lg:hidden"
          trigger={
            <Button variant="ghost" className="hover:bg-transparent">
              <MenuIcon size={30} />
            </Button>
          }
        >
          <Menu orientation="mobile" />
        </GlassSheet>
      </div>
    </div>
  );
};

export default LandingPageNavbar;
