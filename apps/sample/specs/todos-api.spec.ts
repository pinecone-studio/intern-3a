/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import { GET, POST } from '../src/app/api/todos/route';
import { prisma } from '../src/lib/prisma';

// Mock the Prisma client
jest.mock('../src/lib/prisma', () => ({
  prisma: {
    todo: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  },
}));

describe('GET /api/todos', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all todos successfully', async () => {
    const mockTodos = [
      {
        id: 1,
        title: 'Test Todo 1',
        description: 'Description 1',
        completed: false,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      {
        id: 2,
        title: 'Test Todo 2',
        description: null,
        completed: true,
        createdAt: new Date('2024-01-02'),
        updatedAt: new Date('2024-01-02'),
      },
    ];

    (prisma.todo.findMany as jest.Mock).mockResolvedValue(mockTodos);

    const request = new NextRequest('http://localhost:3000/api/todos');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toEqual([
      {
        id: 1,
        title: 'Test Todo 1',
        description: 'Description 1',
        completed: false,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
      {
        id: 2,
        title: 'Test Todo 2',
        description: null,
        completed: true,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    ]);
    expect(prisma.todo.findMany).toHaveBeenCalledWith({
      orderBy: {
        createdAt: 'desc',
      },
    });
  });

  it('should return empty array when no todos exist', async () => {
    (prisma.todo.findMany as jest.Mock).mockResolvedValue([]);

    const request = new NextRequest('http://localhost:3000/api/todos');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toEqual([]);
  });

  it('should handle database errors gracefully', async () => {
    (prisma.todo.findMany as jest.Mock).mockRejectedValue(
      new Error('Database connection failed')
    );

    const request = new NextRequest('http://localhost:3000/api/todos');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.success).toBe(false);
    expect(data.error).toBe('Database connection failed');
  });
});

describe('POST /api/todos', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new todo successfully', async () => {
    const newTodo = {
      title: 'New Todo',
      description: 'New Description',
    };

    const mockCreatedTodo = {
      id: 1,
      title: 'New Todo',
      description: 'New Description',
      completed: false,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    };

    (prisma.todo.create as jest.Mock).mockResolvedValue(mockCreatedTodo);

    const request = new NextRequest('http://localhost:3000/api/todos', {
      method: 'POST',
      body: JSON.stringify(newTodo),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.data).toEqual({
      id: 1,
      title: 'New Todo',
      description: 'New Description',
      completed: false,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
    expect(prisma.todo.create).toHaveBeenCalledWith({
      data: {
        title: 'New Todo',
        description: 'New Description',
      },
    });
  });

  it('should create todo without description', async () => {
    const newTodo = {
      title: 'Todo without description',
    };

    const mockCreatedTodo = {
      id: 2,
      title: 'Todo without description',
      description: null,
      completed: false,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    };

    (prisma.todo.create as jest.Mock).mockResolvedValue(mockCreatedTodo);

    const request = new NextRequest('http://localhost:3000/api/todos', {
      method: 'POST',
      body: JSON.stringify(newTodo),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.data.description).toBe(null);
  });

  it('should trim whitespace from title and description', async () => {
    const newTodo = {
      title: '  Todo with spaces  ',
      description: '  Description with spaces  ',
    };

    const mockCreatedTodo = {
      id: 3,
      title: 'Todo with spaces',
      description: 'Description with spaces',
      completed: false,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    };

    (prisma.todo.create as jest.Mock).mockResolvedValue(mockCreatedTodo);

    const request = new NextRequest('http://localhost:3000/api/todos', {
      method: 'POST',
      body: JSON.stringify(newTodo),
    });

    await POST(request);

    expect(prisma.todo.create).toHaveBeenCalledWith({
      data: {
        title: 'Todo with spaces',
        description: 'Description with spaces',
      },
    });
  });

  it('should reject empty title', async () => {
    const newTodo = {
      title: '',
      description: 'Valid description',
    };

    const request = new NextRequest('http://localhost:3000/api/todos', {
      method: 'POST',
      body: JSON.stringify(newTodo),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toBe('Title is required');
    expect(prisma.todo.create).not.toHaveBeenCalled();
  });

  it('should reject whitespace-only title', async () => {
    const newTodo = {
      title: '   ',
      description: 'Valid description',
    };

    const request = new NextRequest('http://localhost:3000/api/todos', {
      method: 'POST',
      body: JSON.stringify(newTodo),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toBe('Title is required');
  });

  it('should handle database errors', async () => {
    const newTodo = {
      title: 'Valid Todo',
      description: 'Valid description',
    };

    (prisma.todo.create as jest.Mock).mockRejectedValue(
      new Error('Database error')
    );

    const request = new NextRequest('http://localhost:3000/api/todos', {
      method: 'POST',
      body: JSON.stringify(newTodo),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.success).toBe(false);
    expect(data.error).toBe('Database error');
  });
});
