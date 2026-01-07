'use client';

import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { UniversityDialog } from '../_components/UniversityDialog';

export default function UniversitiesPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<any>(null);
  const [universities, setUniversities] = useState<any[]>([]);

  async function fetchUniversities() {
    const res = await fetch('/api/universities');
    const data = await res.json();
    setUniversities(data);
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this university?')) return;

    await fetch(`/api/universities/${id}`, {
      method: 'DELETE',
    });

    fetchUniversities();
  }

  useEffect(() => {
    fetchUniversities();
  }, []);

  const handleAdd = () => {
    setSelectedUniversity(null);
    setDialogOpen(true);
  };

  const handleEdit = (university: any) => {
    setSelectedUniversity(university);
    setDialogOpen(true);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Universities</h1>
          <p className="text-muted-foreground mt-1">Manage university information and registration periods</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add University
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Universities</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>University Name</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Registration Period</TableHead>
                <TableHead>Number of Majors</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {universities.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell>{u.city}</TableCell>
                  <TableCell>
                    {u.burtgelehleh_start_date} – {u.burtgelduusah_end_date}
                  </TableCell>
                  <TableCell>{u._count.majors}</TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(u)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(u.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <UniversityDialog open={dialogOpen} onOpenChange={setDialogOpen} university={selectedUniversity} onSaved={fetchUniversities} />
    </div>
  );
}
