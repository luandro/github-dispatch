import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  // Trigger GitHub repository dispatch with no payload or response needed
  await fetch("https://api.github.com/repos/digidem/comapeo-docs/dispatches", {
    method: "POST",
    headers: {
      Accept: "application/vnd.github.everest-preview+json",
      Authorization: `token ${process.env.PAT}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      event_type: "sync-docs",
      client_payload: { ref: "main" },
    }),
  });

  res.status(200).end();
}
