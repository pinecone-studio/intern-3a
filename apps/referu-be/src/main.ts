import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createReferral } from './controller/referral/createReferral.controller';
import { getAllReferrals } from './controller/referral/getReferrals.controller';
import { checkUser } from './controller/user/checkUser.controller';
import { createUser } from './controller/user/createUser.controller';
import { getUserById } from './controller/user/getUserById.controller';
import connectDB from './db/mongodb';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  clerkMiddleware({
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!,
    secretKey: process.env.CLERK_SECRET_KEY!,
  }),
);
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

app.get('/', (req, res) => {
  res.send('server is running');
});

app.post('/referral', createReferral);
app.get('/referral', getAllReferrals);

app.get('/user/check', checkUser);
app.post('/user', createUser);
app.get('/user', getUserById);

async function bootstrap() {
  try {
    await connectDB();
    console.log('MongoDB connected');

    app.listen(4000, () => {
      console.log('Server running on http://localhost:4000');
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

bootstrap();
