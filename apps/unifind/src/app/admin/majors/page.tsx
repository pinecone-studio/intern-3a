'use client';

import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { MajorDialog } from '../_components/MajorDialog';

export default function MajorsPage() {
  const [universities, setUniversities] = useState<any[]>([]);
  const [majors, setMajors] = useState<any[]>([]);
  const [selectedUniversity, setSelectedUniversity] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState<any>(null);

  async function fetchUniversities() {
    const res = await fetch('/api/universities');
    const data = await res.json();
    setUniversities(data);
    if (data.length && !selectedUniversity) {
      setSelectedUniversity(data[0].id.toString());
    }
  }

  async function fetchMajors(universityId: string) {
    const res = await fetch(`/api/majors?universityId=${universityId}`);
    const data = await res.json();
    setMajors(data);
  }

  useEffect(() => {
    fetchUniversities();
  }, []);

  useEffect(() => {
    if (selectedUniversity) {
      fetchMajors(selectedUniversity);
    }
  }, [selectedUniversity]);

  const handleAdd = () => {
    if (!selectedUniversity) {
      alert('Please select a university first');
      return;
    }
    setSelectedMajor(null);
    setDialogOpen(true);
  };

  const handleEdit = (major: any) => {
    setSelectedMajor(major);
    setDialogOpen(true);
  };

  async function handleDelete(id: number) {
    if (!confirm('Delete this major?')) return;

    await fetch(`/api/majors/${id}`, { method: 'DELETE' });
    fetchMajors(selectedUniversity);
  }

  return (
    <div className="p-8">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Majors</h1>
          <p className="text-muted-foreground mt-1">Manage academic majors and degree programs</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Major
        </Button>
      </div>

      {/* SELECT UNIVERSITY */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Select University</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
            <SelectTrigger className="max-w-md">
              <SelectValue placeholder="Select a university" />
            </SelectTrigger>
            <SelectContent>
              {universities.map((u) => (
                <SelectItem key={u.id} value={u.id.toString()}>
                  {u.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* MAJORS TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>Majors</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Major Name</TableHead>
                <TableHead>University</TableHead>
                <TableHead>Degree</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {majors.map((major) => (
                <TableRow key={major.id}>
                  <TableCell className="font-medium">{major.name}</TableCell>

                  <TableCell className="text-sm text-muted-foreground">{major.universities?.name}</TableCell>

                  <TableCell>
                    <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">{major.degree_type}</span>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(major)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(major.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {!majors.length && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground">
                    No majors found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <MajorDialog open={dialogOpen} onOpenChange={setDialogOpen} major={selectedMajor} universityId={selectedUniversity} onSaved={() => fetchMajors(selectedUniversity)} />
    </div>
  );
}
