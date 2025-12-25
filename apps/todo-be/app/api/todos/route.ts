import { NextRequest, NextResponse } from 'next/server';

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
};

// In-memory storage (resets on server restart)
declare global {
  // eslint-disable-next-line no-var
  var todos: Todo[];
}

if (!global.todos) {
  global.todos = [];
}

// Enable CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// GET /api/todos - Get all todos
export async function GET() {
  return NextResponse.json(global.todos, { headers: corsHeaders });
}

// POST /api/todos - Create a new todo
export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.title || typeof body.title !== 'string') {
    return NextResponse.json(
      { error: 'Title is required' },
      { status: 400, headers: corsHeaders }
    );
  }

  const newTodo: Todo = {
    id: crypto.randomUUID(),
    title: body.title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };

  global.todos.unshift(newTodo);
  return NextResponse.json(newTodo, { status: 201, headers: corsHeaders });
}
