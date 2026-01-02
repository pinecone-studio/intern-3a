import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

// PATCH /api/todos/:id - Update a todo
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const todoId = parseInt(id);

    if (isNaN(todoId)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid todo ID',
        },
        { status: 400 },
      );
    }

    const body = await request.json();
    const { title, description, completed } = body;

    const updateData: {
      title?: string;
      description?: string | null;
      completed?: boolean;
    } = {};

    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description?.trim() || null;
    if (completed !== undefined) updateData.completed = completed;

    const todo = await prisma.todo.update({
      where: { id: todoId },
      data: updateData,
    });

    return NextResponse.json(
      {
        success: true,
        data: todo,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error updating todo:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update todo',
      },
      { status: 500 },
    );
  }
}

// DELETE /api/todos/:id - Delete a todo
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const todoId = parseInt(id);

    if (isNaN(todoId)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid todo ID',
        },
        { status: 400 },
      );
    }

    await prisma.todo.delete({
      where: { id: todoId },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Todo deleted successfully',
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete todo',
      },
      { status: 500 },
    );
  }
}
