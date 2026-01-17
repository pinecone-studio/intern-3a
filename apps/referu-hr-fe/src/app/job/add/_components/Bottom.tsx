import { Button } from '@intern-3a/shadcn';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type Props = {
  formData: any;
};

export const Bottom = ({ formData }: Props) => {
  const router = useRouter();

  const handleSave = () => {
    if (
      !formData.title ||
      !formData.department ||
      !formData.jobType ||
      !formData.level ||
      !formData.salaryMin ||
      !formData.salaryMax ||
      !formData.responsibilities ||
      !formData.requirements ||
      !formData.skills ||
      !formData.benefits ||
      !formData.contactInfo ||
      !formData.location
    ) {
      toast.error('Заавал бөглөх талбаруудыг бөглөнө үү');
      return;
    }

    const id = toast.loading('Хадгалж байна...');

    setTimeout(() => {
      toast.success('Амжилттай хадгалагдлаа', { id });
      router.push('/');
    }, 1000);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-lg">
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" onClick={() => router.push('/')}>
          Цуцлах
        </Button>
        <Button className="flex-1" onClick={handleSave}>
          Хадгалах
        </Button>
      </div>
    </div>
  );
};
