import { NewClub } from '@/lib/models/Club';
import { Project } from '@/lib/models/Project';
import connectDB from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    await connectDB();

    // Find Wall Street English club
    const club = await NewClub.findOne({ clubName: /wall.*street.*english/i });

    if (!club) {
      return NextResponse.json({ success: false, message: 'Wall Street English club not found' }, { status: 404 });
    }

    // Find all projects for this club that have no startDate or finishDate
    const projectsToUpdate = await Project.find({
      clubId: club._id,
      $or: [{ startDate: { $exists: false } }, { startDate: null }, { finishDate: { $exists: false } }, { finishDate: null }],
    });

    if (projectsToUpdate.length === 0) {
      return NextResponse.json({ success: true, message: 'No projects need updating', updatedCount: 0 });
    }

    // Set default dates: start from today, finish 3 months later
    const startDate = new Date();
    const finishDate = new Date();
    finishDate.setMonth(finishDate.getMonth() + 3);

    const updateResults = await Promise.all(
      projectsToUpdate.map(async (project) => {
        if (!project.startDate) {
          project.startDate = startDate;
        }
        if (!project.finishDate) {
          project.finishDate = finishDate;
        }
        await project.save();
        return {
          id: project._id,
          title: project.title,
          startDate: project.startDate,
          finishDate: project.finishDate,
        };
      }),
    );

    return NextResponse.json({
      success: true,
      message: `Successfully updated ${projectsToUpdate.length} projects with dates`,
      updatedCount: projectsToUpdate.length,
      projects: updateResults,
    });
  } catch (error) {
    console.error('Error updating projects:', error);
    return NextResponse.json({ success: false, message: 'Failed to update projects', error: String(error) }, { status: 500 });
  }
}
