export const latinToCyrillicMap: Record<string, string> = {
  sh: 'ш',
  ch: 'ч',
  ts: 'ц',
  ya: 'я',
  yo: 'ё',
  yu: 'ю',

  a: 'а',
  b: 'б',
  v: 'в',
  g: 'г',
  d: 'д',
  e: 'е',
  j: 'ж',
  z: 'з',
  i: 'и',
  k: 'к',
  l: 'л',
  m: 'м',
  n: 'н',
  o: 'о',
  p: 'п',
  r: 'р',
  s: 'с',
  t: 'т',
  u: 'у',
  f: 'ф',
  h: 'х',
  c: 'с',
  y: 'й',

  ö: 'ө',
  ü: 'ү',
};

export function latinToCyrillic(input: string): string {
  if (!input) return '';

  let result = input.toLowerCase();

  Object.keys(latinToCyrillicMap)
    .sort((a, b) => b.length - a.length)
    .forEach((latin) => {
      result = result.replaceAll(latin, latinToCyrillicMap[latin]);
    });

  return result;
}
