// Vercel Serverless Function for View Counter
// Uses Upstash Redis for persistent storage

import { Redis } from '@upstash/redis';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Initialize Redis client with environment variables (auto-injected by Vercel)
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    // Increment and get the view count in one atomic operation
    const views = await redis.incr('page_views');

    // Return the count
    return res.status(200).json({ views: views });
  } catch (error) {
    console.error('Error tracking views:', error);
    return res.status(200).json({ views: 0 });
  }
}
