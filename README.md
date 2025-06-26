# sync-docs-dispatch Vercel Function

This Vercel Serverless Function triggers a GitHub repository dispatch event for syncing documentation. It is designed to be called via a POST request (for example, from another service, a webhook, or a Slack integration).

## Setup

### 1. Deploy to Vercel

1. Place the function in your project at `api/sync-docs-dispatch.ts`.
2. Deploy to Vercel:
   ```bash
   vercel --prod
   ```
3. Note your deployment URL (e.g., `https://your-project.vercel.app`).

### 2. Environment Variables

Add the following environment variable to your Vercel project:

- `PAT`: Your GitHub Personal Access Token with `repo` scope.

To add environment variables:

1. Go to your Vercel dashboard.
2. Select your project.
3. Go to Settings → Environment Variables.
4. Add `PAT` with your GitHub token value.

## Usage

Send a POST request to the deployed endpoint to trigger the sync. For example:
