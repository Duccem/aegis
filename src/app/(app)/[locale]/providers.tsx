"use client";

import { queryClient } from "@/contexts/shared/infrastructure/http/http-query-client";
import { I18nProviderClient } from "@/contexts/shared/infrastructure/translation/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";

export const Providers = ({
  children,
  locale = "es",
}: {
  children: React.ReactNode;
  locale: string;
}) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NuqsAdapter>
        <I18nProviderClient locale={locale}>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider> <Toaster />
        </I18nProviderClient>
      </NuqsAdapter>
    </ThemeProvider>
  );
};
