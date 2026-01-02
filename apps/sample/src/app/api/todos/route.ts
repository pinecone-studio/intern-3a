import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '../../../generated/prisma';
import { prisma } from '../../../lib/prisma';

// GET /api/todos - Get all todos
export async function GET(_request: NextRequest) {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: todos,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch todos',
      },
      { status: 500 },
    );
  }
}

// POST /api/todos - Create a new todo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description }: Prisma.TodoCreateInput = body;

    if (!title || title.trim() === '') {
      return NextResponse.json(
        {
          success: false,
          error: 'Title is required',
        },
        { status: 400 },
      );
    }

    const todo = await prisma.todo.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: todo,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create todo',
      },
      { status: 500 },
    );
  }
}
