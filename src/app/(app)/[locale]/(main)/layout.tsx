import { SessionProvider } from "@/components/auth/session-provider";
import { AppSidebar } from "@/components/shared/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getSession } from "@/lib/auth/server";
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
        <AppSidebar variant="floating" />
        <SidebarInset>
          <div className="flex flex-col">
            <main className="flex-1">{children}</main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  );
}
