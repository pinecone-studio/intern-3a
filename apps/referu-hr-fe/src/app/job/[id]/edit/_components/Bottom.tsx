import { Button } from '@intern-3a/shadcn';

type Props = {
  hasReferrals: boolean;
  onCancel: () => void;
  onSave: () => void;
};

export const Bottom = ({ hasReferrals, onCancel, onSave }: Props) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-lg">
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" onClick={onCancel}>
          Цуцлах
        </Button>
        <Button className="flex-1" onClick={onSave} disabled={hasReferrals}>
          Хадгалах
        </Button>
      </div>
    </div>
  );
};
