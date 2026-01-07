'use client';

import { Save } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

// Mock data
const mockUniversities = [
  { id: 1, name: 'National University' },
  { id: 2, name: 'Tech University' },
  { id: 3, name: 'Medical University' },
];

const mockMajors = [
  { id: 1, name: 'Computer Science', universityId: 1 },
  { id: 2, name: 'Software Engineering', universityId: 1 },
  { id: 3, name: 'Data Science', universityId: 1 },
];

const mockSubjects = [
  { id: 1, name: 'Mathematics', minScore: 7.0 },
  { id: 2, name: 'English', minScore: 6.5 },
  { id: 3, name: 'Physics', minScore: 6.0 },
  { id: 4, name: 'Chemistry', minScore: 0 },
  { id: 5, name: 'Literature', minScore: 0 },
];

export default function RequirementsPage() {
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Admission Requirements</h1>
        <p className="text-muted-foreground mt-1">Set minimum subject scores for major admission</p>
      </div>

      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Select University</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a university" />
              </SelectTrigger>
              <SelectContent>
                {mockUniversities.map((university) => (
                  <SelectItem key={university.id} value={university.id.toString()}>
                    {university.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Select Major</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedMajor} onValueChange={setSelectedMajor} disabled={!selectedUniversity}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a major" />
              </SelectTrigger>
              <SelectContent>
                {mockMajors.map((major) => (
                  <SelectItem key={major.id} value={major.id.toString()}>
                    {major.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {selectedUniversity && selectedMajor && (
        <Card>
          <CardHeader>
            <CardTitle>Subject Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockSubjects.map((subject) => (
                <div key={subject.id} className="flex items-center gap-4 rounded-lg border border-border p-4">
                  <div className="flex-1">
                    <Label htmlFor={`subject-${subject.id}`} className="text-base font-medium">
                      {subject.name}
                    </Label>
                  </div>
                  <div className="w-32">
                    <Input id={`subject-${subject.id}`} type="number" step="0.5" min="0" max="10" placeholder="0.0" defaultValue={subject.minScore || ''} className="text-center" />
                  </div>
                  <div className="text-sm text-muted-foreground w-24">Min. Score</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Requirements
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {(!selectedUniversity || !selectedMajor) && (
        <Card>
          <CardContent className="py-12">
            <p className="text-center text-muted-foreground">Please select a university and major to configure admission requirements</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
