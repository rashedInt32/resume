import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import superjson from "superjson";
import type { AppRouter } from "@resume/trpc";
export const serverTrpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/api/trpc", // Adjust to your tRPC endpoint
      transformer: superjson,
    }),
  ],
});

export const trpc = createTRPCReact<AppRouter>();
