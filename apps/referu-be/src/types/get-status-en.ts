export function statusMNtoEN(value: string) {
  if (value === 'Ажиллаж байгаа') return 'CURRENTLY_EMPLOYED';
  if (value === 'Сурч байгаа') return 'STUDENT';
  if (value === 'Ажиллахгүй байгаа') return 'UNEMPLOYED';
  if (value === 'Бусад') return 'OTHER';
  return value;
}
