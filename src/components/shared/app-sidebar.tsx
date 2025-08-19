"use client";

import { motion } from "framer-motion";
import * as React from "react";

import { NavMain } from "@/components/shared/navs/main-nav";
import { NavUser } from "@/components/shared/navs/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  CreditCard,
  Grip,
  LayoutDashboard,
  Map,
  Package,
  PieChart,
  Settings,
  WalletCards,
  Warehouse,
} from "lucide-react";

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
          url: "/products/categories",
        },
        {
          title: "Brands",
          url: "/products/brands",
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
          url: "/store/stores",
        },
        {
          title: "Stock",
          url: "/store/stock",
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
