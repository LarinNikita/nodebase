import { requireAuth } from "@/lib/auth-utils";

interface PageProps {
  params: Promise<{
    executionId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  await requireAuth();
  const { executionId } = await params;

  return (
    <>
      <h1>Page {executionId}</h1>
      <p>Page content</p>
    </>
  );
}
