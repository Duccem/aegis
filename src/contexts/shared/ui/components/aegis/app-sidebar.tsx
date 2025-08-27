"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/contexts/shared/ui/components/shadcn/sidebar";
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
import { IconDotsVertical } from "@tabler/icons-react";

import { useSession } from "@/contexts/auth/user/ui/components/auth/session-provider";
import { authClient } from "@/contexts/shared/infrastructure/auth/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/contexts/shared/ui/components/shadcn/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/contexts/shared/ui/components/shadcn/dropdown-menu";
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
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className=" flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img
                    src={"/images/aegis-white.png"}
                    className="size-6 hidden dark:block"
                    alt=""
                  />
                  <img
                    src={"/images/aegis-black.png"}
                    className="size-6 block dark:hidden"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Aegis</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
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
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
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
  const { isMobile } = useSidebar();
  const { organization, organizations } = useSession();
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
                <AvatarImage src={organization?.logo ?? ""} alt={organization?.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{organization?.name}</span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "top"}
            align="start"
          >
            <DropdownMenuGroup>
              {(organizations?.length ?? 0) > 0 && (
                <>
                  {organizations?.map((org) => (
                    <DropdownMenuItem
                      key={org.id}
                      onClick={async (e) => {
                        e.preventDefault();
                        await authClient.organization.setActive({
                          organizationId: org.id,
                        });
                        window.location.reload();
                      }}
                    >
                      <Avatar className="h-6 w-6 rounded-lg grayscale">
                        <AvatarImage src={org.logo ?? ""} alt={org.name} />
                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                      </Avatar>
                      {org.name}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem className="cursor-pointer">
                Create new organization
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
