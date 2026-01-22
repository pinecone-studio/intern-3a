import dotenv from 'dotenv';
import express from 'express';
import * as path from 'path';
import connectDB from './db/mongodb';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcomex to-be!' });
});

const port = process.env.PORT || 3333;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/api`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed ❌', err);
  });
