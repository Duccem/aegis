"use client";

import {
  IconBuildingWarehouse,
  IconCoin,
  IconDashboard,
  IconListDetails,
  IconSettings,
} from "@tabler/icons-react";
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
import { Grip, Map, PieChart } from "lucide-react";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/home",
      icon: IconDashboard,
      items: [],
    },
    {
      title: "Actives",
      url: "/actives",
      icon: IconListDetails,
      items: [
        {
          title: "Products",
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
      icon: IconBuildingWarehouse,
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
      title: "Finance",
      url: "#",
      icon: IconCoin,
      items: [
        {
          title: "Invoices",
          url: "/finance/invoices",
        },
        {
          title: "Expenses",
          url: "/finance/expenses",
        },
        {
          title: "Payments",
          url: "/finance/payments",
        },
      ],
    },
    {
      title: "Configuration",
      url: "/settings",
      icon: IconSettings,
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
