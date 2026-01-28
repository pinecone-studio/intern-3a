// import { clerkClient } from '@clerk/clerk-sdk-node';
// import { NextFunction, Request, Response } from 'express';

// export const clerkAuth = async (req: Request & { clerkId?: string; clerkUser?: any }, res: Response, next: NextFunction) => {
//   try {
//     const authHeader = req.headers.authorization;
//     console.log({ authHeader });
//     if (!authHeader?.startsWith('Bearer ')) {
//       return res.status(401).json({ error: 'Missing token!' });
//     }

//     const token = authHeader.split(' ')[1];

//     const payload = await clerkClient.verifyToken(token, {
//       secretKey: process.env.CLERK_SECRET_KEY!,
//     });

//     req.clerkId = payload.sub;
//     req.clerkUser = payload;

//     next();
//   } catch (error) {
//     return res.status(401).json({ error: 'Invalid token!' });
//   }
// };
