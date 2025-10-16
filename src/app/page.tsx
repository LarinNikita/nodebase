import { requireAuth } from "@/lib/auth-utils";

import { caller } from "@/trpc/server";

export default async function Page() {
  await requireAuth();

  const data = await caller.getUsers();
  const testAI = await caller.testAI();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <pre className="text-center whitespace-pre-wrap">
        {JSON.stringify(testAI, null, 2)}
      </pre>
    </div>
  );
}
