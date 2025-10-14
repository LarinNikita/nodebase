import { requireAuth } from "@/lib/auth-utils";

import { caller } from "@/trpc/server";

export default async function Page() {
  await requireAuth();

  const data = await caller.getUsers();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
