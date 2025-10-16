import { requireAuth } from "@/lib/auth-utils";

interface PageProps {
  params: Promise<{
    credentialId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  await requireAuth();
  const { credentialId } = await params;

  return (
    <>
      <h1>Page {credentialId}</h1>
      <p>Page content</p>
    </>
  );
}
