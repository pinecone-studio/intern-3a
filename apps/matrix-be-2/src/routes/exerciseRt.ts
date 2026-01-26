import { Router } from 'express';
import { ExerciseModel } from '../models/exercise';

const router = Router();

// GET all exercises
router.get('/', async (req, res) => {
  try {
    const exercises = await ExerciseModel.find();
    res.json(exercises);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch exercises' });
  }
});

// GET single exercise by ID
router.get('/:id', async (req, res) => {
  try {
    const exercise = await ExerciseModel.findById(req.params.id);
    if (!exercise) return res.status(404).json({ error: 'Exercise not found' });
    res.json(exercise);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch exercise' });
  }
});

export default router;
