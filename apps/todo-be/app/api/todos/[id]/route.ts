import { NextRequest, NextResponse } from 'next/server';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
};

declare global {
  // eslint-disable-next-line no-var
  var todos: Todo[];
}

if (!global.todos) {
  global.todos = [];
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// GET /api/todos/[id] - Get a single todo
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const todo = global.todos.find((t) => t.id === id);

  if (!todo) {
    return NextResponse.json(
      { error: 'Todo not found' },
      { status: 404, headers: corsHeaders }
    );
  }

  return NextResponse.json(todo, { headers: corsHeaders });
}

// PATCH /api/todos/[id] - Update a todo
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const todoIndex = global.todos.findIndex((t) => t.id === id);

  if (todoIndex === -1) {
    return NextResponse.json(
      { error: 'Todo not found' },
      { status: 404, headers: corsHeaders }
    );
  }

  const updatedTodo = {
    ...global.todos[todoIndex],
    ...(body.title !== undefined && { title: body.title }),
    ...(body.completed !== undefined && { completed: body.completed }),
  };

  global.todos[todoIndex] = updatedTodo;
  return NextResponse.json(updatedTodo, { headers: corsHeaders });
}

// DELETE /api/todos/[id] - Delete a todo
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const todoIndex = global.todos.findIndex((t) => t.id === id);

  if (todoIndex === -1) {
    return NextResponse.json(
      { error: 'Todo not found' },
      { status: 404, headers: corsHeaders }
    );
  }

  global.todos.splice(todoIndex, 1);
  return NextResponse.json({ success: true }, { headers: corsHeaders });
}
