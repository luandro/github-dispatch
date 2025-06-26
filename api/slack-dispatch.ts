import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse the payload from Slack
    const payload = JSON.parse(req.body.payload);
    
    // Quick acknowledgment to Slack
    res.status(200).send('');
    
    // Check if the action value is 'sync-docs'
    if (payload.actions[0].value === 'sync-docs') {
      // Make a request to GitHub API to trigger repository dispatch
      const githubResponse = await fetch('https://api.github.com/repos/digidem/comapeo-docs/dispatches', {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.github.everest-preview+json',
          'Authorization': `token ${process.env.PAT}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          event_type: 'sync-docs',
          client_payload: { ref: 'main' }
        })
      });
      
      // Send a follow-up message to Slack with the result
      await fetch(payload.response_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: githubResponse.ok
            ? '✅ sync-docs dispatched!'
            : `❌ dispatch failed: ${githubResponse.status}`
        })
      });
    }
  } catch (error) {
    console.error('Error processing Slack request:', error);
    // We've already sent a 200 response, so we can't send an error response here
  }
}