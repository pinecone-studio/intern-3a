'use client';

import { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';

interface UniversityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  university?: any;
  onSaved: () => void;
}

export function UniversityDialog({ open, onOpenChange, university, onSaved }: UniversityDialogProps) {
  const isEdit = !!university;

  const [form, setForm] = useState({
    name: '',
    city: '',
    description: '',
    website: '',
    image: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    if (university) {
      setForm({
        name: university.name ?? '',
        city: university.city ?? '',
        description: university.description ?? '',
        website: university.website ?? '',
        image: university.image ?? '',
        startDate: university.burtgelehleh_start_date?.slice(0, 10) ?? '',
        endDate: university.burtgelduusah_end_date?.slice(0, 10) ?? '',
      });
    } else {
      setForm({
        name: '',
        city: '',
        description: '',
        website: '',
        image: '',
        startDate: '',
        endDate: '',
      });
    }
  }, [university, open]);

  async function handleSubmit() {
    if (isEdit && !university?.id) {
      alert('Invalid university ID');
      return;
    }

    try {
      const res = await fetch(isEdit ? `/api/universities/${university.id}` : '/api/universities', {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('API error:', text);
        alert('Something went wrong');
        return;
      }

      onSaved();
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit University' : 'Add University'}</DialogTitle>
          <DialogDescription>{isEdit ? 'Update university information' : 'Enter the details for the new university'}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>University Name</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>

          <div className="grid gap-2">
            <Label>City</Label>
            <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          </div>

          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>

          <div className="grid gap-2">
            <Label>Website/optional</Label>
            <Input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
          </div>

          <div className="grid gap-2">
            <Label>Image URL</Label>
            <Input placeholder="https://..." value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label>Registration Start</Label>
              <Input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label>Registration End</Label>
              <Input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>{isEdit ? 'Save Changes' : 'Add University'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
