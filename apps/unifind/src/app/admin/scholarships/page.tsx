'use client';

import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

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

const mockScholarshipRules = [
  { id: 1, mathScore: 9.0, englishScore: 8.5, discount: 50 },
  { id: 2, mathScore: 8.0, englishScore: 7.5, discount: 30 },
  { id: 3, mathScore: 7.0, englishScore: 7.0, discount: 20 },
];

export default function ScholarshipsPage() {
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Scholarship Rules</h1>
        <p className="text-muted-foreground mt-1">Configure scholarship eligibility based on academic performance</p>
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
        <>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New Scholarship Rule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="grid gap-2">
                  <Label htmlFor="mathScore">Minimum Math Score</Label>
                  <Input id="mathScore" type="number" step="0.5" min="0" max="10" placeholder="0.0" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="englishScore">Minimum English Score</Label>
                  <Input id="englishScore" type="number" step="0.5" min="0" max="10" placeholder="0.0" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="discount">Discount Percentage</Label>
                  <Input id="discount" type="number" min="0" max="100" placeholder="0" />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Rule
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Existing Scholarship Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Minimum Math Score</TableHead>
                    <TableHead>Minimum English Score</TableHead>
                    <TableHead>Discount Percentage</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockScholarshipRules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium">{rule.mathScore}</TableCell>
                      <TableCell className="font-medium">{rule.englishScore}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-sm font-medium text-primary">{rule.discount}%</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}

      {(!selectedUniversity || !selectedMajor) && (
        <Card>
          <CardContent className="py-12">
            <p className="text-center text-muted-foreground">Please select a university and major to configure scholarship rules</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
