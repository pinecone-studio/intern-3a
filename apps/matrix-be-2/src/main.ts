// apps/matrix-backend2/src/main.ts
import cors from 'cors';
import express, { Request, Response } from 'express';
import { connectDB } from './db';
import { HistoryModel } from './models/history';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello Nx Express!');
});

app.post('/api/history', async (req: Request, res: Response) => {
  try {
    const newEntry = await HistoryModel.create(req.body);
    res.status(201).json(newEntry);
  } catch (error) {
    console.error('Error saving history:', error);
    res.status(500).json({ error: 'Failed to save history' });
  }
});

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

startServer();
