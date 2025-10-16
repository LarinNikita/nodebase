import { RegisterForm } from "@/features/auth/components/RegisterForm";

import { requireUnauth } from "@/lib/auth-utils";

export default async function Page() {
  await requireUnauth();

  return <RegisterForm />;
}
