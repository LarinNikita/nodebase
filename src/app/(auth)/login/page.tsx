import { LoginForm } from "@/features/auth/components/LoginForm";

import { requireUnauth } from "@/lib/auth-utils";

export default async function Page() {
  await requireUnauth();

  return <LoginForm />;
}
