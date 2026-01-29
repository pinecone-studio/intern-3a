import { HrPostedJobsType } from '@/lib/type';
import { Button } from '@intern-3a/shadcn';
import { Edit, Trash2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

type Props = {
  jobDetail: HrPostedJobsType;
};

export const Bottom = ({ jobDetail }: Props) => {
  const router = useRouter();
  const params = useParams();

  const handleEdit = () => {
    if (!jobDetail) return;

    // if (jobDetail.hasReferrals) {
    //   toast.error('Санал ирсэн зарыг засварлах боломжгүй');
    //   return;
    // }

    router.push(`/job/${params.id}/edit`);
  };

  const handleDelete = () => {
    toast('Та энэ зарыг устгахдаа итгэлтэй байна уу?', {
      action: {
        label: 'Устгах',
        onClick: () => {
          toast.success('Зар амжилттай устгагдлаа 🗑️');
          router.push('/');
        },
      },
    });
  };
  return (
    <div>
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-lg">
        <div className="flex gap-3">
          <Button variant="destructive" className="flex-1" onClick={handleDelete}>
            <Trash2 className="w-4 h-4 mr-2" />
            Устгах
          </Button>
          <Button className="flex-1" onClick={handleEdit}>
            <Edit className="w-4 h-4 mr-2" />
            Засах
          </Button>
        </div>
      </div>

      {/* <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Зарыг устгах уу?</AlertDialogTitle>
            <AlertDialogDescription>Энэ үйлдлийг буцаах боломжгүй. Зар устгагдсаны дараа ажилчдын түүхэнд "HR-аас устгагдсан" гэж харагдана.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Үгүй</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Тийм</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </div>
  );
};
