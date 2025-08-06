import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";

const Header = () => {
  return (
    <header className="bg-background top-0 flex shrink-0 items-center justify-between gap-2  p-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
      </div>
    </header>
  );
};

export default Header;
