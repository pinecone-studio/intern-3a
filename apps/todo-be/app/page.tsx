'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@pinecone-intern/ui';

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Todo API Server</CardTitle>
          <CardDescription>
            Backend running on port 4201
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">API Endpoints:</h3>
            <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-2">
              <p><span className="text-green-600">GET</span> /api/todos - Get all todos</p>
              <p><span className="text-blue-600">POST</span> /api/todos - Create a todo</p>
              <p><span className="text-green-600">GET</span> /api/todos/[id] - Get a todo</p>
              <p><span className="text-yellow-600">PATCH</span> /api/todos/[id] - Update a todo</p>
              <p><span className="text-red-600">DELETE</span> /api/todos/[id] - Delete a todo</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
