"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  // const users = await caller.getUsers();
  const trpc = useTRPC();
  const { data: users } = useQuery(trpc.getUsers.queryOptions());

  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1>{JSON.stringify(users)}</h1>
    </div>
  );
}
