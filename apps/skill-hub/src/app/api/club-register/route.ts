// import { Register } from '@/lib/models/Register';
// import { User } from '@/lib/models/User';
// import connectDB from '@/lib/mongodb';
// import { auth } from '@clerk/nextjs/server';
// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(req: NextRequest) {
//   try {
//     await connectDB();

//     const { userId: userClerkId } = await auth();
//     // const action =

//     if (!userClerkId) {
//       return NextResponse.json(
//         { message: 'Unauthorized' },
//         {
//           status: 401,
//         },
//       );
//     }

//     const registration = await User.findOne({ userClerkId: userClerkId });

//     const { projectId } = await req.json();

//     if (!projectId) {
//       return NextResponse.json({ error: 'Missing curriculum' }, { status: 400 });
//     }

//     const userId = registration.userId;

//     const registered = await Register.findOne({ projectId, userId });
//     if (registered) {
//       return NextResponse.json({ message: 'Already registered to the club' }, { status: 200 });
//     }
//   } catch {}
// }

import { NewClub } from '@/lib/models/Club';
import { Project } from '@/lib/models/Project';
import { Register } from '@/lib/models/Register';
import { User } from '@/lib/models/User';
import connectDB from '@/lib/mongodb';
import { clubRegister } from '@/lib/services/register-service';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { userId: userClerkId } = await auth();

    if (!userClerkId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    let user = await User.findOne({ userClerkId });
    if (!user) {
      user = await User.create({
        userClerkId,
        userStatus: 'GENERAL',
      });
    }

    const { projectId } = await req.json();

    if (!projectId) {
      return NextResponse.json({ error: 'Missing projectId' }, { status: 400 });
    }

    const existing = await clubRegister(user._id, projectId, 'PENDING');
    return NextResponse.json({ message: 'Successfully registered', registration: existing }, { status: 201 });
  } catch (err: any) {
    console.error('Error in registration:', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { userId: userClerkId } = await auth();

    if (!userClerkId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await User.findOne({ userClerkId: userClerkId });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const registeredClubsRaw = await Register.find({ userId: user._id }).sort({ createdAt: -1 });

    const registeredClubs = await Promise.all(
      registeredClubsRaw.map(async (registered) => {
        const registeredClub = await Project.findById(registered.projectId);
        return { ...registered.toObject(), projectId: registeredClub };
      }),
    );

    return NextResponse.json({ registeredClubs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch registered clubs' }, { status: 500 });
  }
}
