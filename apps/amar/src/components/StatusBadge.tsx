function StatusBadge({ status }: { status: 'Pending' | 'Completed' | 'Missed' }) {
  const styles = {
    Pending: 'bg-indigo-100 text-indigo-600',
    Completed: 'bg-emerald-100 text-emerald-600',
    Missed: 'bg-rose-100 text-rose-600',
  };

  return <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${styles[status]}`}>{status}</span>;
}
