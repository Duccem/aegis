import { Chat } from "@/contexts/assistant/chat/ui/components";
import { SessionProvider } from "@/contexts/auth/user/ui/components/auth/session-provider";
import { getSession } from "@/contexts/shared/infrastructure/auth/server";
import { AppSidebar } from "@/contexts/shared/ui/components/aegis/app-sidebar";
import Header from "@/contexts/shared/ui/components/aegis/header";
import { SidebarInset, SidebarProvider } from "@/contexts/shared/ui/components/shadcn/sidebar";
import { redirect } from "next/navigation";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const data = await getSession();
  if (!data || !data?.session) {
    return redirect("/sign-in");
  }
  return (
    <SessionProvider user={data.user}>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="sidebar" />
        <SidebarInset>
          <div className="flex flex-col">
            <Header />
            <main>{children}</main>
          </div>
          <Chat />
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  );
}
