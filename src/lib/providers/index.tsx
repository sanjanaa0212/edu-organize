"use client";

import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { useState, type PropsWithChildren } from "react";

export const Providers = ({ children }: PropsWithChildren) => {
  const [client] = useState(new QueryClient());

  return (
    <NuqsAdapter>
      <QueryClientProvider client={client}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster richColors />
      </QueryClientProvider>
    </NuqsAdapter>
  );
};
