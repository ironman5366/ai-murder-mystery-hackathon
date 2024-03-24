import { LLMMessage } from "../providers/mysteryContext";
import { API_URL } from "../constants";

export interface InvokeParams {
  globalStory: string;
  messages: LLMMessage[];
}

export interface InvokeResponse {
  response: string;
}

export default async function invokeAI({
  globalStory,
  messages,
}: InvokeParams): Promise<InvokeResponse> {
  const resp = await fetch(`${API_URL}/invoke/`, {
    method: "POST",
    body: JSON.stringify({
      global_story: globalStory,
      messages,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await resp.json();
}
