"use client";

import { motion } from "framer-motion";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/contexts/shared/ui/components/shadcn/sidebar";
import { cn } from "@/contexts/shared/ui/utils/utils";
import {
  ChevronRight,
  CreditCard,
  Grip,
  LayoutDashboard,
  LucideIcon,
  Map,
  Package,
  PieChart,
  Settings,
  SunMoon,
  WalletCards,
  Warehouse,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/contexts/shared/ui/components/animate-ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/contexts/shared/ui/components/shadcn/sidebar";
import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react";

import { useSession } from "@/contexts/auth/user/ui/components/auth/session-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/contexts/shared/ui/components/shadcn/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/contexts/shared/ui/components/shadcn/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/contexts/shared/ui/components/shadcn/select";
import { useTheme } from "next-themes";
import Link from "next/link";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/home",
      icon: LayoutDashboard,
      items: [],
    },
    {
      title: "Catalogue",
      url: "/actives",
      icon: Package,
      items: [
        {
          title: "Items",
          url: "/products",
        },
        {
          title: "Categories",
          url: "/category",
        },
        {
          title: "Brands",
          url: "/brand",
        },
      ],
    },
    {
      title: "Storage",
      url: "#",
      icon: Warehouse,
      items: [
        {
          title: "Stores",
          url: "/stores",
        },
        {
          title: "Stock",
          url: "/stock",
        },
      ],
    },
    {
      title: "Sales",
      url: "#",
      icon: CreditCard,
      items: [
        {
          title: "Item prices",
          url: "/sales/prices",
        },
        {
          title: "Price lists",
          url: "/sales/price-lists",
        },
        {
          title: "Customers",
          url: "/sales/customers",
        },
        {
          title: "Quotations",
          url: "/sales/quotations",
        },
        {
          title: "Orders",
          url: "/sales/orders",
        },
        {
          title: "Invoices",
          url: "/sales/invoices",
        },
        {
          title: "Payments",
          url: "/sales/payments",
        },
      ],
    },
    {
      title: "Buying",
      url: "#",
      icon: WalletCards,
      items: [
        {
          title: "Item costs",
          url: "/buying/costs",
        },
        {
          title: "Cost lists",
          url: "/buying/cost-lists",
        },
        {
          title: "Suppliers",
          url: "/buying/suppliers",
        },
        {
          title: "Quotations",
          url: "/buying/quotations",
        },
        {
          title: "Orders",
          url: "/buying/orders",
        },
        {
          title: "Purchase Invoices",
          url: "/buying/invoices",
        },
      ],
    },
    {
      title: "Configuration",
      url: "/settings",
      icon: Settings,
      items: [
        {
          title: "General",
          url: "/settings/general",
        },
        {
          title: "Users",
          url: "/settings/users",
        },
        {
          title: "Roles",
          url: "/settings/roles",
        },
        {
          title: "Permissions",
          url: "/settings/permissions",
        },
      ],
    },
  ],
  favorites: [
    {
      name: "Integrations",
      url: "#",
      icon: Grip,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader
        className={cn(
          "flex md:pt-3.5 ",
          isCollapsed
            ? "items-center justify-between gap-y-4 flex-col"
            : "flex-row items-center justify-between",
        )}
      >
        <a href="/home" className="flex items-center gap-2">
          <div className=" flex aspect-square size-8 items-center justify-center rounded-lg">
            <img src={"/images/aegis-white.png"} className="size-6 hidden dark:block" alt="" />
            <img src={"/images/aegis-black.png"} className="size-6 block dark:hidden" alt="" />
          </div>
          {!isCollapsed && (
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Aegis</span>
            </div>
          )}
        </a>
        <motion.div
          key={isCollapsed ? "header-collapsed" : "header-expanded"}
          className={`flex ${
            isCollapsed ? "flex-row md:flex-col-reverse" : "flex-row"
          } items-center gap-2`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <SidebarTrigger />
        </motion.div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Administration</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              {item.items && item.items.length > 0 ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : (
                <SidebarMenuButton asChild tooltip={item.title}>
                  <a href={item.url} className="flex items-center gap-2">
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function NavUser() {
  const { user } = useSession();
  const { isMobile } = useSidebar();
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={user?.image ?? ""} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="text-muted-foreground truncate text-xs">{user.email}</span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.image ?? ""} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="text-muted-foreground truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href={"/profile"} className="flex items-center gap-2 w-full">
                  <IconUserCircle />
                  Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconCreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconNotification />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <div className="flex justify-between items-center gap-3 py-3 pr-3">
                <div className="ml-2 flex justify-start items-center gap-2">
                  <SunMoon className="size-4" />
                  Theme
                </div>
                <Select defaultValue={resolvedTheme} onValueChange={(theme) => setTheme(theme)}>
                  <SelectTrigger className=" w-1/2 p-2 h-[25px]">
                    <SelectValue placeholder="select" />
                  </SelectTrigger>
                  <SelectContent className="">
                    <SelectItem value={"light"}>
                      <span className="flex w-full justify-between items-center gap-3">Light</span>
                    </SelectItem>
                    <SelectItem value={"dark"}>
                      <span className="flex w-full justify-between items-center gap-3">Dark</span>
                    </SelectItem>
                    <SelectItem value={"system"}>
                      <span className="flex w-full justify-between items-center gap-3">System</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
