export function formatDate(isoDate: string) {
  const date = new Date(isoDate);

  return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
}
