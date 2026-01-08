import { Project } from '@/lib/models/Project';
import connectDB from '@/lib/mongodb';
import Ably from 'ably';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { clubId, adminId, title, description, classLevel, difficultyLevel, childrenCount, startDate, finishDate } = body;

    // Validate required fields
    if (!clubId || !adminId || !title || !description || !classLevel || !difficultyLevel || childrenCount === undefined || childrenCount === null || childrenCount === '') {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create new project
    const newProject = await Project.create({
      clubId,
      adminId,
      title,
      description,
      classLevel,
      difficultyLevel,
      childrenCount: Number(childrenCount),
      startDate: startDate ? new Date(startDate) : undefined,
      finishDate: finishDate ? new Date(finishDate) : undefined,
    });

    const ably = new Ably.Rest({ key: process.env.ABLY_API_KEY });
    const channel = ably.channels.get(`club-${clubId}-projects`);
    await channel.publish({ name: 'project-created', data: newProject });

    return NextResponse.json(
      {
        message: 'Project created successfully',
        project: newProject,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project', details: error }, { status: 500 });
  }
}

// GET all projects for a specific club
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const clubId = searchParams.get('clubId');

    if (!clubId) {
      return NextResponse.json({ error: 'clubId is required' }, { status: 400 });
    }

    const projects = await Project.find({ clubId }).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        projects,
        count: projects.length,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
