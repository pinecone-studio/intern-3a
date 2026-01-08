'use client';

import { useUser } from '@clerk/nextjs';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@intern-3a/shadcn';
import { useState } from 'react';

type ProjectDialogProps = {
  clubId: string | null;
};

export const ProjectDialog = ({ clubId }: ProjectDialogProps) => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    classLevel: '',
    difficultyLevel: '',
    childrenCount: '',
    startDate: '',
    finishDate: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if user is loaded and has mongoUserId
      if (!user?.publicMetadata?.mongoUserId) {
        alert('Хэрэглэгчийн MongoDB мэдээлэл олдсонгүй. Дахин нэвтэрнэ үү.');
        setLoading(false);
        return;
      }

      const dataToSend = {
        clubId,
        adminId: user.publicMetadata.mongoUserId,
        ...projectData,
      };

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create project');
      }

      alert('Хөтөлбөр амжилттай нэмэгдлээ! ✅');

      setOpen(false);
      // Reset form
      setProjectData({
        title: '',
        description: '',
        classLevel: '',
        difficultyLevel: '',
        childrenCount: '',
        startDate: '',
        finishDate: '',
      });
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Алдаа гарлаа: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProjectData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-linear-to-r from-[#FCB027] to-[#ff9500] hover:from-[#e5a020] hover:to-[#e68600] text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          + Хөтөлбөр нэмэх
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader className="space-y-3 pb-4 border-b">
          <DialogTitle className="text-2xl font-bold bg-linear-to-r from-[#FCB027] to-[#ff9500] bg-clip-text text-transparent">✨ Шинэ хөтөлбөр нэмэх</DialogTitle>
          <DialogDescription className="text-base text-gray-600">Дугуйлангийн хөтөлбөрийн мэдээлэл оруулна уу</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          {/* Title Section */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              📝 Хөтөлбөрийн нэр <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Жишээ: Намрын уран бүтээлийн наадам"
              value={projectData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="border-2 focus:border-[#FCB027] rounded-lg"
              required
            />
          </div>

          {/* Description Section */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              📄 Тайлбар <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Хөтөлбөрийн зорилго, агуулга, хүрэх үр дүнгийн талаар дэлгэрэнгүй бичнэ үү..."
              value={projectData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={5}
              className="border-2 focus:border-[#FCB027] rounded-lg resize-none"
              required
            />
          </div>

          {/* Class Level */}
          <div className="space-y-2">
            <Label htmlFor="classLevel" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              🎓 Анги <span className="text-red-500">*</span>
            </Label>
            <Select value={projectData.classLevel} onValueChange={(value) => handleInputChange('classLevel', value)} required>
              <SelectTrigger className="border-2 focus:border-[#FCB027] rounded-lg">
                <SelectValue placeholder="Анги сонгох" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Elementary">🎒 Бага (I-V анги)</SelectItem>
                <SelectItem value="Middle">📚 Дунд (V-IX анги)</SelectItem>
                <SelectItem value="High">🎓 Ахлах (IX-XII анги)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Difficulty Level Select */}
          <div className="space-y-2">
            <Label htmlFor="difficultyLevel" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              🏆 Түвшин <span className="text-red-500">*</span>
            </Label>
            <Select value={projectData.difficultyLevel} onValueChange={(value) => handleInputChange('difficultyLevel', value)} required>
              <SelectTrigger className="border-2 focus:border-[#FCB027] rounded-lg">
                <SelectValue placeholder="Түвшин сонгох" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">🌱 Анхан (Beginner)</SelectItem>
                <SelectItem value="Intermediate">⭐ Дунд (Intermediate)</SelectItem>
                <SelectItem value="Pro">🏆 Ахисан (Pro)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Children Count */}
          <div className="space-y-2">
            <Label htmlFor="childrenCount" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              👶 Хүүхдийн тоо <span className="text-red-500">*</span>
            </Label>
            <Input
              id="childrenCount"
              type="number"
              min="1"
              placeholder="25"
              value={projectData.childrenCount}
              onChange={(e) => handleInputChange('childrenCount', e.target.value)}
              className="border-2 focus:border-[#FCB027] rounded-lg"
              required
            />
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                📅 Эхлэх огноо
              </Label>
              <Input id="startDate" type="date" value={projectData.startDate} onChange={(e) => handleInputChange('startDate', e.target.value)} className="border-2 focus:border-[#FCB027] rounded-lg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="finishDate" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                📅 Дуусах огноо
              </Label>
              <Input
                id="finishDate"
                type="date"
                value={projectData.finishDate}
                onChange={(e) => handleInputChange('finishDate', e.target.value)}
                className="border-2 focus:border-[#FCB027] rounded-lg"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="px-6 border-2 hover:bg-gray-100 rounded-lg font-semibold" disabled={loading}>
              Болих
            </Button>
            <Button type="submit" className="px-6 bg-linear-to-r from-[#FCB027] to-[#ff9500] hover:from-[#e5a020] hover:to-[#e68600] text-white rounded-lg font-semibold shadow-lg" disabled={loading}>
              {loading ? '⏳ Хадгалж байна...' : '💾 Хадгалах'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
