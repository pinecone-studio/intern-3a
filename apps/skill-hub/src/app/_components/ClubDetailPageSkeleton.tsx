import { Skeleton } from '@intern-3a/shadcn';

export const ClubDetailPageSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-10">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Зүүн талын мэдээллийн хэсэг */}
        <div className="w-full lg:w-[40%] space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 space-y-6 shadow-sm">
            <div className="space-y-3">
              <Skeleton className="h-5 w-24 rounded-full bg-slate-200" /> {/* Category */}
              <Skeleton className="h-10 w-full rounded-xl bg-slate-200" /> {/* Title Line 1 */}
              <Skeleton className="h-10 w-2/3 rounded-xl bg-slate-200" /> {/* Title Line 2 */}
            </div>

            <div className="space-y-4 pt-4">
              <Skeleton className="h-14 w-full rounded-2xl bg-slate-100" /> {/* Address Box */}
              <Skeleton className="h-16 w-full rounded-2xl bg-orange-100/50" /> {/* Action Button */}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-12 rounded-xl bg-slate-100" />
              <Skeleton className="h-12 rounded-xl bg-slate-100" />
            </div>
          </div>

          {/* Багшийн карт */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-6 flex items-center gap-4">
            <Skeleton className="h-20 w-20 rounded-2xl bg-slate-200 shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-32 bg-slate-200" />
              <Skeleton className="h-4 w-24 bg-slate-100" />
            </div>
          </div>
        </div>

        {/* Баруун талын зураг болон текст */}
        <div className="w-full lg:w-[60%] space-y-8">
          {/* Зургийн хэсэг - Aspect ratio ашигласнаар layout shift-ээс сэргийлнэ */}
          <div className="relative aspect-16/10 md:aspect-video w-full">
            <Skeleton className="absolute inset-0 rounded-[3rem] bg-slate-200" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-2 bg-orange-200 rounded-full" />
              <Skeleton className="h-8 w-48 bg-slate-200 rounded-lg" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-slate-100" />
              <Skeleton className="h-4 w-full bg-slate-100" />
              <Skeleton className="h-4 w-4/5 bg-slate-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
