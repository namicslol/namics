// Vercel Serverless Function for View Counter
// This uses Vercel KV for persistent storage

import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Get current view count
    let views = await kv.get('page_views');

    // Initialize if doesn't exist
    if (views === null) {
      views = 0;
    }

    // Increment view count
    views = parseInt(views) + 1;

    // Save new count
    await kv.set('page_views', views);

    // Return the count
    return res.status(200).json({ views: views });
  } catch (error) {
    console.error('Error tracking views:', error);
    return res.status(200).json({ views: 0 });
  }
}
