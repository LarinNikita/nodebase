import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";

import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import {
  WorkflowsContainer,
  WorkflowsList,
} from "@/features/workflows/components/workflows";

import { requireAuth } from "@/lib/auth-utils";

import { HydrateClient } from "@/trpc/server";

export default async function Page() {
  await requireAuth();

  prefetchWorkflows();

  return (
    <WorkflowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <WorkflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowsContainer>
  );
}
