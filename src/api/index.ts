import express from 'express';
import cors from 'cors';
import { getBlocks } from '../db/inMemoryStore';

const app = express();

// Enable CORS for frontend access
app.use(cors());

// Define the API route
app.get('/api/latest-blocks', (req, res) => {
  const blocks = getBlocks();
  res.json(blocks);
});

export default app;