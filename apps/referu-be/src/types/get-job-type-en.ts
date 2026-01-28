export function jobTypeMNtoEN(value: string) {
  if (value === 'Бүтэн цагийн') return 'FULL_TIME';
  if (value === 'Цагийн ажил') return 'PART_TIME';
  if (value === 'Ээлжийн') return 'SHIFT_BASED';
  if (value === 'Улирлын') return 'SEASONAL';
  if (value === 'Гэрээт') return 'CONTRACT';
  if (value === 'Түр ажил') return 'TEMPORARY';
  if (value === 'Бусад') return 'OTHER';
  return value;
}
