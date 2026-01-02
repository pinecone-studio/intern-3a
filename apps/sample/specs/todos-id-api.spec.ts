/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import { PATCH, DELETE } from '../src/app/api/todos/[id]/route';
import { prisma } from '../src/lib/prisma';

// Mock the Prisma client
jest.mock('../src/lib/prisma', () => ({
  prisma: {
    todo: {
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe('PATCH /api/todos/:id', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update todo title successfully', async () => {
    const updatedTodo = {
      id: 1,
      title: 'Updated Title',
      description: 'Original Description',
      completed: false,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-02'),
    };

    (prisma.todo.update as jest.Mock).mockResolvedValue(updatedTodo);

    const request = new NextRequest('http://localhost:3000/api/todos/1', {
      method: 'PATCH',
      body: JSON.stringify({ title: 'Updated Title' }),
    });

    const response = await PATCH(request, {
      params: Promise.resolve({ id: '1' }),
    });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toEqual({
      id: 1,
      title: 'Updated Title',
      description: 'Original Description',
      completed: false,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
    expect(prisma.todo.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { title: 'Updated Title' },
    });
  });

  it('should update todo description successfully', async () => {
    const updatedTodo = {
      id: 1,
      title: 'Original Title',
      description: 'Updated Description',
      completed: false,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-02'),
    };

    (prisma.todo.update as jest.Mock).mockResolvedValue(updatedTodo);

    const request = new NextRequest('http://localhost:3000/api/todos/1', {
      method: 'PATCH',
      body: JSON.stringify({ description: 'Updated Description' }),
    });

    const response = await PATCH(request, {
      params: Promise.resolve({ id: '1' }),
    });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(prisma.todo.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { description: 'Updated Description' },
    });
  });

  it('should toggle todo completion status', async () => {
    const updatedTodo = {
      id: 1,
      title: 'Test Todo',
      description: 'Test Description',
      completed: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-02'),
    };

    (prisma.todo.update as jest.Mock).mockResolvedValue(updatedTodo);

    const request = new NextRequest('http://localhost:3000/api/todos/1', {
      method: 'PATCH',
      body: JSON.stringify({ completed: true }),
    });

    const response = await PATCH(request, {
      params: Promise.resolve({ id: '1' }),
    });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data.completed).toBe(true);
    expect(prisma.todo.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { completed: true },
    });
  });

  it('should update multiple fields at once', async () => {
    const updatedTodo = {
      id: 1,
      title: 'New Title',
      description: 'New Description',
      completed: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-02'),
    };

    (prisma.todo.update as jest.Mock).mockResolvedValue(updatedTodo);

    const request = new NextRequest('http://localhost:3000/api/todos/1', {
      method: 'PATCH',
      body: JSON.stringify({
        title: 'New Title',
        description: 'New Description',
        completed: true,
      }),
    });

    const response = await PATCH(request, {
      params: Promise.resolve({ id: '1' }),
    });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(prisma.todo.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        title: 'New Title',
        description: 'New Description',
        completed: true,
      },
    });
  });

  it('should set description to null when empty string provided', async () => {
    const updatedTodo = {
      id: 1,
      title: 'Test Todo',
      description: null,
      completed: false,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-02'),
    };

    (prisma.todo.update as jest.Mock).mockResolvedValue(updatedTodo);

    const request = new NextRequest('http://localhost:3000/api/todos/1', {
      method: 'PATCH',
      body: JSON.stringify({ description: '' }),
    });

    const response = await PATCH(request, {
      params: Promise.resolve({ id: '1' }),
    });

    expect(prisma.todo.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { description: null },
    });
  });

  it('should trim whitespace from title and description', async () => {
    const updatedTodo = {
      id: 1,
      title: 'Trimmed Title',
      description: 'Trimmed Description',
      completed: false,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-02'),
    };

    (prisma.todo.update as jest.Mock).mockResolvedValue(updatedTodo);

    const request = new NextRequest('http://localhost:3000/api/todos/1', {
      method: 'PATCH',
      body: JSON.stringify({
        title: '  Trimmed Title  ',
        description: '  Trimmed Description  ',
      }),
    });

    await PATCH(request, {
      params: Promise.resolve({ id: '1' }),
    });

    expect(prisma.todo.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        title: 'Trimmed Title',
        description: 'Trimmed Description',
      },
    });
  });

  it('should reject invalid todo ID (non-numeric)', async () => {
    const request = new NextRequest('http://localhost:3000/api/todos/abc', {
      method: 'PATCH',
      body: JSON.stringify({ title: 'Updated Title' }),
    });

    const response = await PATCH(request, {
      params: Promise.resolve({ id: 'abc' }),
    });
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toBe('Invalid todo ID');
    expect(prisma.todo.update).not.toHaveBeenCalled();
  });

  it('should handle non-existent todo', async () => {
    (prisma.todo.update as jest.Mock).mockRejectedValue(
      new Error('Record to update not found')
    );

    const request = new NextRequest('http://localhost:3000/api/todos/999', {
      method: 'PATCH',
      body: JSON.stringify({ title: 'Updated Title' }),
    });

    const response = await PATCH(request, {
      params: Promise.resolve({ id: '999' }),
    });
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.success).toBe(false);
    expect(data.error).toBe('Record to update not found');
  });

  it('should handle database errors', async () => {
    (prisma.todo.update as jest.Mock).mockRejectedValue(
      new Error('Database connection failed')
    );

    const request = new NextRequest('http://localhost:3000/api/todos/1', {
      method: 'PATCH',
      body: JSON.stringify({ title: 'Updated Title' }),
    });

    const response = await PATCH(request, {
      params: Promise.resolve({ id: '1' }),
    });
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.success).toBe(false);
    expect(data.error).toBe('Database connection failed');
  });
});

describe('DELETE /api/todos/:id', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete todo successfully', async () => {
    const deletedTodo = {
      id: 1,
      title: 'Deleted Todo',
      description: 'This will be deleted',
      completed: false,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    };

    (prisma.todo.delete as jest.Mock).mockResolvedValue(deletedTodo);

    const request = new NextRequest('http://localhost:3000/api/todos/1', {
      method: 'DELETE',
    });

    const response = await DELETE(request, {
      params: Promise.resolve({ id: '1' }),
    });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toBe('Todo deleted successfully');
    expect(prisma.todo.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should reject invalid todo ID (non-numeric)', async () => {
    const request = new NextRequest('http://localhost:3000/api/todos/xyz', {
      method: 'DELETE',
    });

    const response = await DELETE(request, {
      params: Promise.resolve({ id: 'xyz' }),
    });
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toBe('Invalid todo ID');
    expect(prisma.todo.delete).not.toHaveBeenCalled();
  });

  it('should handle non-existent todo', async () => {
    (prisma.todo.delete as jest.Mock).mockRejectedValue(
      new Error('Record to delete does not exist')
    );

    const request = new NextRequest('http://localhost:3000/api/todos/999', {
      method: 'DELETE',
    });

    const response = await DELETE(request, {
      params: Promise.resolve({ id: '999' }),
    });
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.success).toBe(false);
    expect(data.error).toBe('Record to delete does not exist');
  });

  it('should handle database errors', async () => {
    (prisma.todo.delete as jest.Mock).mockRejectedValue(
      new Error('Database connection failed')
    );

    const request = new NextRequest('http://localhost:3000/api/todos/1', {
      method: 'DELETE',
    });

    const response = await DELETE(request, {
      params: Promise.resolve({ id: '1' }),
    });
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.success).toBe(false);
    expect(data.error).toBe('Database connection failed');
  });

  it('should handle deletion of different todo IDs', async () => {
    (prisma.todo.delete as jest.Mock).mockResolvedValue({
      id: 42,
      title: 'Todo 42',
      description: null,
      completed: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    });

    const request = new NextRequest('http://localhost:3000/api/todos/42', {
      method: 'DELETE',
    });

    const response = await DELETE(request, {
      params: Promise.resolve({ id: '42' }),
    });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(prisma.todo.delete).toHaveBeenCalledWith({
      where: { id: 42 },
    });
  });
});
