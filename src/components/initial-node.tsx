"use client";

import { memo } from "react";

import { PlusIcon } from "lucide-react";
import type { NodeProps } from "@xyflow/react";

import { WorkflowNode } from "./workflow-node";
import { PlaceholderNode } from "./placeholder-node";

export const InitialNode = memo((props: NodeProps) => {
  return (
    <WorkflowNode showToolbar={false}>
      <PlaceholderNode {...props}>
        <div className="flex cursor-pointer items-center justify-center">
          <PlusIcon className="size-4" />
        </div>
      </PlaceholderNode>
    </WorkflowNode>
  );
});

InitialNode.displayName = "InitialNode";
