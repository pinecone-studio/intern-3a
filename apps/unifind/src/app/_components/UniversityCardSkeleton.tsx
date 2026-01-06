export function UniversityCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-lg border bg-white dark:bg-neutral-900 shadow-sm">
      {/* Image */}
      <div className="h-48 bg-slate-200 dark:bg-neutral-800" />

      <div className="p-4 pt-0 space-y-4">
        {/* Icon + title */}
        <div className="flex items-start gap-2 lg:gap-3 mt-6">
          <div className="h-9 w-9 rounded-lg bg-slate-200 dark:bg-neutral-700 shrink-0" />

          <div className="flex-1 space-y-2">
            <div className="h-5 w-3/4 rounded bg-slate-200 dark:bg-neutral-700" />
            <div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-neutral-700" />
          </div>
        </div>

        {/* Score row */}
        <div className="flex justify-between border-t pt-2 mt-10">
          <div className="h-4 w-20 rounded bg-slate-200 dark:bg-neutral-700" />
          <div className="h-4 w-12 rounded bg-slate-200 dark:bg-neutral-700" />
        </div>

        {/* Button */}
        <div className="h-10 w-full rounded-md bg-slate-200 dark:bg-neutral-700 mb-4 mt-2" />
      </div>
    </div>
  );
}
