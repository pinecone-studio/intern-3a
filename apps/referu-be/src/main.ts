import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createReferral } from './controller/referral/createReferral.controller';
import { getAllReferrals } from './controller/referral/getReferrals.controller';
import { createUser } from './controller/user/createUser.controller';
import { getUserById } from './controller/user/getUserById.controller';
import connectDB from './db/mongodb';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);

app.get('/', (req, res) => {
  res.send('server id1 runing');
});

app.post('/referral', createReferral);

app.get('/referral', getAllReferrals);

app.post('/user', createUser);

app.get('/user/:id', getUserById);

app.listen(4000, async () => {
  await connectDB();
  console.log('Server is running on http://localhost:4000');
});
