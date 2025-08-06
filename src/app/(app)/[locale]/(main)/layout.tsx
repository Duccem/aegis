import { SessionProvider } from "@/components/auth/session-provider";
import { getSession } from "@/lib/auth/server";
import { redirect } from "next/navigation";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const data = await getSession();
  if (!data || !data?.session) {
    return redirect("/sign-in");
  }
  return (
    <SessionProvider user={data.user}>
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">{children}</main>
      </div>
    </SessionProvider>
  );
}
