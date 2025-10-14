import { LoginForm } from "@/app/features/auth/components/LoginForm";

import { requireAuth } from "@/lib/auth-utils";

export default async function Page() {
  await requireAuth();

  return <LoginForm />;
}
