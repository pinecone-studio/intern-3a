'use client';

import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@pinecone-intern/ui';
import { Check, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:4201/api';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
};

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const res = await fetch(`${API_URL}/todos`);
      if (!res.ok) throw new Error('Failed to fetch todos');
      const data = await res.json();
      setTodos(data);
      setError(null);
    } catch {
      setError('Failed to connect to API. Make sure todo-be is running on port 4201.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add todo
  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const res = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTodo }),
      });
      if (!res.ok) throw new Error('Failed to add todo');
      const todo = await res.json();
      setTodos([todo, ...todos]);
      setNewTodo('');
    } catch {
      setError('Failed to add todo');
    }
  };

  // Toggle todo completion
  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      const res = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }),
      });
      if (!res.ok) throw new Error('Failed to update todo');
      const updated = await res.json();
      setTodos(todos.map((t) => (t.id === id ? updated : t)));
    } catch {
      setError('Failed to update todo');
    }
  };

  // Delete todo
  const deleteTodo = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete todo');
      setTodos(todos.filter((t) => t.id !== id));
    } catch {
      setError('Failed to delete todo');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Todo App</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add Todo Form */}
          <form onSubmit={addTodo} className="flex gap-2 mb-6">
            <Input type="text" placeholder="What needs to be done?" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} className="flex-1" />
            <Button type="submit">Add</Button>
          </form>

          {/* Error Message */}
          {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">{error}</div>}

          {/* Loading State */}
          {loading && <div className="text-center text-gray-500 py-8">Loading...</div>}

          {/* Todo List */}
          {!loading && todos.length === 0 && !error && <div className="text-center text-gray-500 py-8">No todos yet. Add one above!</div>}

          <ul className="space-y-2">
            {todos.map((todo) => (
              <li key={todo.id} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border">
                <button
                  onClick={() => toggleTodo(todo.id, todo.completed)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    todo.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-green-500'
                  }`}
                >
                  {todo.completed && <Check className="w-4 h-4" />}
                </button>
                <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}>{todo.title}</span>
                <button onClick={() => deleteTodo(todo.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>

          {/* Stats */}
          {todos.length > 0 && (
            <div className="mt-4 pt-4 border-t text-sm text-gray-500 flex justify-between">
              <span>{todos.filter((t) => !t.completed).length} items left</span>
              <span>{todos.filter((t) => t.completed).length} completed</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
