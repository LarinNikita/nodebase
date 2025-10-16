import { generateText } from "ai";
import { ollama } from "ollama-ai-provider-v2";

import { inngest } from "./client";

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    const { steps } = await step.ai.wrap("ollama-generate-text", generateText, {
      model: ollama("qwen3-vl:235b-cloud"),
      system:
        "You are a helpful assistant that helps users with their questions.",
      prompt: "What is the capital of France?",
    });

    return steps;
  },
);
