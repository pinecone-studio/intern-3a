'use client';

import { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Textarea } from '../../components/ui/textarea';

interface MajorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  major?: any;
  universityId: string;
  onSaved: () => void;
}

export function MajorDialog({ open, onOpenChange, major, universityId, onSaved }: MajorDialogProps) {
  const isEdit = !!major;

  const [name, setName] = useState('');
  const [degreeType, setDegreeType] = useState<'BACHELOR' | 'MASTER' | 'DOCTOR'>('BACHELOR');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (major) {
      setName(major.name || '');
      setDegreeType(major.degree_type || 'BACHELOR');
      setDescription(major.description || '');
    } else {
      setName('');
      setDegreeType('BACHELOR');
      setDescription('');
    }
  }, [major, open]);

  async function handleSave() {
    if (!name.trim()) {
      alert('Major name is required');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(isEdit ? `/api/majors/${major.id}` : '/api/majors', {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          degree_type: degreeType,
          university_id: Number(universityId),
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to save major');
      }

      onOpenChange(false);
      onSaved();
    } catch (err) {
      console.error(err);
      alert('Error saving major');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Major' : 'Add Major'}</DialogTitle>
          <DialogDescription>{isEdit ? 'Update major information' : 'Enter the details for the new major'}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Major Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Computer Science" />
          </div>

          <div className="grid gap-2">
            <Label>Degree Type</Label>
            <Select value={degreeType} onValueChange={(v) => setDegreeType(v as 'BACHELOR' | 'MASTER' | 'DOCTOR')}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BACHELOR">Bachelor</SelectItem>
                <SelectItem value="MASTER">Master</SelectItem>
                <SelectItem value="DOCTOR">Doctor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Description (optional)</Label>
            <Textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description of the major..." />
            <p className="text-xs text-muted-foreground">AI-generated description can be added later</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Major'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
