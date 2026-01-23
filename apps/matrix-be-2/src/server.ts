import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { ExerciseModel } from './models/exercise';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Backend is running!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// server.ts
app.get('/exercises', async (_, res) => {
  const data = await ExerciseModel.find();
  res.json(data);
});
