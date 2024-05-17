import { EndOfCallReportPayload } from "../../types/vapi.types";
import { kv } from '@vercel/kv';
import { aiSummarize } from "./openai";

export const endOfCallReportHandler = async (
  payload?: EndOfCallReportPayload
): Promise<void> => {
  /**
   * Handle Business logic here.
   * You can store the information like summary, typescript, recordingUrl or even the full messages list in the database.
   */
   // Store the end-of-call report details in Vercel KV
   const { call, summary, transcript, recordingUrl, messages } = payload;
   const timestamp = new Date().toISOString()
   await kv.set(`call_report:${timestamp}`, {
    call,
    summary,
    transcript,
    recordingUrl,
    messages,
    timestamp: timestamp,
  });
  const aiSummary = await aiSummarize(summary, transcript)
  await kv.set(`order:${timestamp}`, { aiSummary});

  return;
};
