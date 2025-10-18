import { Suspense } from "react";

import type { SearchParams } from "nuqs/server";
import { ErrorBoundary } from "react-error-boundary";

import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { workflowsParamsLoader } from "@/features/workflows/server/params-loader";
import {
  WorkflowsContainer,
  WorkflowsError,
  WorkflowsList,
  WorkflowsLoading,
} from "@/features/workflows/components/workflows";

import { requireAuth } from "@/lib/auth-utils";

import { HydrateClient } from "@/trpc/server";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page({ searchParams }: PageProps) {
  await requireAuth();

  const params = await workflowsParamsLoader(searchParams);
  prefetchWorkflows(params);

  return (
    <WorkflowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<WorkflowsError />}>
          <Suspense fallback={<WorkflowsLoading />}>
            <WorkflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowsContainer>
  );
}
