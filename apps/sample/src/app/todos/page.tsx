'use client';

import { useEffect, useState } from 'react';
import { Todo } from '../../generated/prisma';

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos');
      const data = await response.json();
      if (data.success) {
        setTodos(data.data);
      }
    } catch (err) {
      console.error('Error fetching todos:', err);
      setError('Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });

      const data = await response.json();
      if (data.success) {
        setTodos([data.data, ...todos]);
        setTitle('');
        setDescription('');
        setError('');
      }
    } catch (err) {
      console.error('Error creating todo:', err);
      setError('Failed to create todo');
    }
  };

  const toggleTodo = async (id: number, completed: boolean) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }),
      });

      const data = await response.json();
      if (data.success) {
        setTodos(todos.map((todo) => (todo.id === id ? data.data : todo)));
      }
    } catch (err) {
      console.error('Error toggling todo:', err);
      setError('Failed to update todo');
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        setTodos(todos.filter((todo) => todo.id !== id));
      }
    } catch (err) {
      console.error('Error deleting todo:', err);
      setError('Failed to delete todo');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading todos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">Todo App</h1>

        {error && <div className="px-4 py-3 mb-4 text-red-700 border border-red-200 rounded bg-red-50">{error}</div>}

        <form onSubmit={createTodo} className="p-6 mb-6 bg-white rounded-lg shadow">
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter todo title"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter description (optional)"
              rows={3}
            />
          </div>

          <button type="submit" className="w-full px-4 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700">
            Add Todo
          </button>
        </form>

        <div className="space-y-4">
          {todos.length === 0 ? (
            <div className="p-8 text-center text-gray-500 bg-white rounded-lg shadow">No todos yet. Create one to get started!</div>
          ) : (
            todos.map((todo) => (
              <div key={todo.id} className="p-4 transition-shadow bg-white rounded-lg shadow hover:shadow-md">
                <div className="flex items-start gap-3">
                  <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id, todo.completed)} className="w-5 h-5 mt-1 cursor-pointer" />
                  <div className="flex-1">
                    <h3 className={`font-semibold text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>{todo.title}</h3>
                    {todo.description && <p className={`mt-1 ${todo.completed ? 'text-gray-400' : 'text-gray-600'}`}>{todo.description}</p>}
                    <p className="mt-2 text-xs text-gray-400">Created: {new Date(todo.createdAt).toLocaleDateString()}</p>
                  </div>
                  <button onClick={() => deleteTodo(todo.id)} className="font-medium text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {todos.length > 0 && (
          <div className="mt-6 text-center text-gray-600">
            Total: {todos.length} todo{todos.length !== 1 ? 's' : ''} ({todos.filter((t) => t.completed).length} completed)
          </div>
        )}
      </div>
    </div>
  );
}
