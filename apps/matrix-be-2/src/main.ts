import cors from 'cors';
import express, { Request, Response } from 'express';
import { connectDB } from './db';
import { ExerciseModel } from './models/exercise';
import { HistoryModel } from './models/history';
import { SettingsModel } from './models/settings';
import { StatsModel } from './models/stats';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root
app.get('/', (req: Request, res: Response) => {
  res.send('Hello Nx Express!');
});

// --------------------
// Exercises
// --------------------
app.get('/api/exercises', async (req: Request, res: Response) => {
  try {
    const exercises = await ExerciseModel.find();
    res.json(exercises);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch exercises' });
  }
});

// --------------------
// History
// --------------------
app.get('/api/history', async (req: Request, res: Response) => {
  try {
    const history = await HistoryModel.find();
    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
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

// --------------------
// Settings
// --------------------
app.get('/api/settings', async (req: Request, res: Response) => {
  try {
    const settings = await SettingsModel.findOne();
    res.json(settings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// --------------------
// Stats
// --------------------
app.get('/api/stats', async (req: Request, res: Response) => {
  try {
    const stats = await StatsModel.findOne();
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch stats' });
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
