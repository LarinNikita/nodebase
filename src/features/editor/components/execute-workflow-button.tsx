import { FlaskConicalIcon } from "lucide-react";

import { useExecuteWorkflow } from "@/features/workflows/hooks/use-workflows";

import { Button } from "@/components/ui/button";

export const ExecuteWorkflowButton = ({
  workflowId,
}: {
  workflowId: string;
}) => {
  const executeWorkflow = useExecuteWorkflow();

  const handleExecute = () => {
    executeWorkflow.mutate({
      id: workflowId,
    });
  };

  return (
    <Button
      size="lg"
      onClick={handleExecute}
      disabled={executeWorkflow.isPending}
    >
      <FlaskConicalIcon className="size-4" />
      Execute workflow
    </Button>
  );
};
