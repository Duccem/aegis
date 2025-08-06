import LayoutBanner from "@/components/auth/layout-banner";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen grid-cols-2 ">
      <div className="col-span-2 md:col-span-1 ">{children}</div>
      <div className="col-span-1 hidden md:flex p-4 relative">
        <LayoutBanner />
      </div>
    </div>
  );
}
