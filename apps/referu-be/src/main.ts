import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { getJobs } from './controller/jobs/jobs.controller';
import { createReferral } from './controller/referral/createReferral.controller';
import { createReferralStatusBonusHundred } from './controller/referral/createReferralStatusBonusHundred.controller';
import { createReferralStatusBonusTwoHundred } from './controller/referral/createReferralStatusBonusTwoHundred.controller';
import { createReferralStatusRejected } from './controller/referral/createReferralStatusRejected.controller';
import { getEmployeeByClerkId } from './controller/referral/getEmployeeByClerkId.controller';
import { getAllReferrals } from './controller/referral/getReferrals.controller';
import { getAllReferralsHR } from './controller/referral/getReferralsHR.controller';
import { checkUser } from './controller/user/checkUser.controller';
import { createUser } from './controller/user/createUser.controller';
import { getUserById } from './controller/user/getUserById.controller';
import { startWorkiCron } from './cron/worki.cron';
import connectDB from './db/mongodb';
import { upload } from './middleware/multer';

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
    origin: true,
    credentials: true,
  }),
);

app.get('/', (_, res) => {
  res.send('server is running');
});

app.get('/jobs/worki', getJobs);

app.post('/referral', upload.single('candidateResume'), createReferral);
app.get('/referral', getAllReferrals);
app.get('/hr/referral', getAllReferralsHR);
app.get('/hr/referral/:clerkId', getEmployeeByClerkId);
app.patch('/hr/referral/:id/bonus100', createReferralStatusBonusHundred);
app.patch('/hr/referral/:id/bonus200', createReferralStatusBonusTwoHundred);
app.patch('/hr/referral/:id/rejected', createReferralStatusRejected);

app.get('/user/check', checkUser);
app.post('/user', createUser);
app.get('/user', getUserById);

async function bootstrap() {
  try {
    await connectDB();
    console.log('MongoDB connected');

    app.listen(4000, () => {
      console.log('Server running on http://localhost:4000');
      startWorkiCron();
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

bootstrap();
