"use client";
import { useSession } from "@/contexts/auth/user/ui/components/auth/session-provider";
import {
  Bell,
  Hexagon,
  LayoutList,
  LogOut,
  Moon,
  Package,
  Sparkles,
  Sun,
  User2,
} from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";

import { authClient } from "@/contexts/shared/infrastructure/auth/client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcn/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../shadcn/breadcrumb";
import { Button, buttonVariants } from "../shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../shadcn/dropdown-menu";
import { SidebarTrigger } from "../shadcn/sidebar";

const Header = () => {
  return (
    <div className="flex justify-between items-center w-full px-6 py-3">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Breadcrumbs />
      </div>
      <div className="flex items-center gap-3">
        <Button variant={"secondary"} size={"icon"} className="cursor-pointer">
          <Sparkles />
        </Button>
        <ToggleTheme />
        <Notifications />
        <SignOut />
        <NavUser />
      </div>
    </div>
  );
};

export default Header;

const breadcrumbs = [
  { path: "/products", parts: ["Catalogue", "Items"], icon: Package },
  { path: "/category", parts: ["Catalogue", "Categories"], icon: LayoutList },
  { path: "/brand", parts: ["Catalogue", "Brands"], icon: Hexagon },
  { path: "/profile", parts: ["Profile"], icon: User2 },
];

const Breadcrumbs = () => {
  const path = usePathname();
  const parts = breadcrumbs.find((b) => path.startsWith(b.path));
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {path !== "/home" ? (
            <BreadcrumbLink href="/home">Home</BreadcrumbLink>
          ) : (
            <BreadcrumbPage>Home</BreadcrumbPage>
          )}
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {parts && (
          <>
            {parts.parts.map((part, index) => (
              <span key={index} className="flex items-center">
                {index > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  <BreadcrumbPage>{part}</BreadcrumbPage>
                </BreadcrumbItem>
              </span>
            ))}
            {parts.icon && <parts.icon className="size-4 mr-2" />}
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

function NavUser() {
  const { user } = useSession();

  return (
    <Link
      href={"/profile"}
      className={buttonVariants({
        variant: "secondary",
        size: "icon",
        className: "cursor-pointer p-0",
      })}
    >
      <Avatar className="h-8 w-8 rounded-lg grayscale">
        <AvatarImage src={user?.image ?? ""} alt={user.name} />
        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
      </Avatar>
    </Link>
  );
}

function ToggleTheme() {
  const { setTheme, resolvedTheme } = useTheme();
  const toggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };
  return (
    <Button variant={"secondary"} size={"icon"} className="cursor-pointer" onClick={toggle}>
      <Moon className="size-4 hidden dark:block" />
      <Sun className="size-4 dark:hidden" />
    </Button>
  );
}

function SignOut() {
  const router = useRouter();
  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };
  return (
    <Button variant={"secondary"} size={"icon"} className="cursor-pointer" onClick={signOut}>
      <LogOut className="size-4" />
    </Button>
  );
}

function Notifications() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"secondary"} size={"icon"} className="cursor-pointer">
          <Bell className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="">
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex flex-col p-3">
            <span className="text-sm font-medium">Notifications</span>
            <span className="text-xs text-muted-foreground">You have 3 new notifications</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-60 w-72 overflow-y-auto">
          <div className="flex flex-col p-3 hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer">
            <span className="text-sm">New user registered</span>
            <span className="text-xs text-muted-foreground">5 minutes ago</span>
          </div>
          <div className="flex flex-col p-3 hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer">
            <span className="text-sm">Server overloaded</span>
            <span className="text-xs text-muted-foreground">10 minutes ago</span>
          </div>
          <div className="flex flex-col p-3 hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer">
            <span className="text-sm">New order received</span>
            <span className="text-xs text-muted-foreground">15 minutes ago</span>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
