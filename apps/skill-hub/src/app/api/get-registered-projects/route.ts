import connectDB from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { Register } from '@/lib/models/Register';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');

    if (!projectId) {
      return NextResponse.json({ message: 'projectId is required' }, { status: 400 });
    }

    const registrations = await Register.find({
      projectId,
      status: 'PENDING',
    })
      .populate('userId', 'firstName email')
      .populate('projectId', 'title');

    return NextResponse.json({ data: registrations }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch registrations' }, { status: 500 });
  }
}
