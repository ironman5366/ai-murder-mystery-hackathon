import { Actor } from "../providers/mysteryContext";
import { API_URL } from "../constants";

export interface InvokeParams {
  globalStory: string;
  actor: Actor;
}

export interface InvokeResponse {
  original_response: string;
  critique_response: string;
  problems_detected: boolean;
  final_response: string;
  refined_response: string;
}

export default async function invokeAI({
  globalStory,
  actor,
}: InvokeParams): Promise<InvokeResponse> {
  const resp = await fetch(`${API_URL}/invoke/`, {
    method: "POST",
    body: JSON.stringify({
      global_story: globalStory,
      actor,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await resp.json();
}
