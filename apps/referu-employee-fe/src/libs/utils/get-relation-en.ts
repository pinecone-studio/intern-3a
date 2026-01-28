export function relationMNtoEN(value: string) {
  if (value === 'Хамт ажиллаж байсан') return 'FORMER_COLLEAGUE';
  if (value === 'Хамт сурч байсан') return 'ALUMNI';
  if (value === 'Найз') return 'FRIEND';
  if (value === 'Гэр бүл, хамаатан садан') return 'FAMILY_RELATIVES';
  if (value === 'Бусад') return 'OTHER';
  return value;
}
