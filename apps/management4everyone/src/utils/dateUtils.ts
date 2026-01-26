// utils/dateUtils.ts

/**
 * Timestamp / ISO / number → Date объект болгох
 */
export const parseDate = (value: string | number | null | undefined): Date | null => {
  if (!value) return null;

  // numeric string → number
  if (!isNaN(Number(value))) {
    const num = Number(value);

    // секунд эсвэл миллисекунд ялгана
    return new Date(num < 1e12 ? num * 1000 : num);
  }

  // ISO string
  return new Date(value);
};

/**
 * Огноо форматлах (YYYY-MM-DD)
 */
export const formatDate = (value: string | number | null | undefined) => {
  const d = parseDate(value);
  if (!d || isNaN(d.getTime())) return '-';

  return d.toLocaleDateString('mn-MN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Ulaanbaatar',
  });
};

/**
 * Цаг форматлах (HH:mm)
 */
export const formatTime = (value: string | number | null | undefined) => {
  const d = parseDate(value);
  if (!d || isNaN(d.getTime())) return '-';

  return d.toLocaleTimeString('mn-MN', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Ulaanbaatar',
  });
};

/**
 * Огноо + цаг хамт
 */
export const formatDateTime = (value: string | number | null | undefined) => {
  const d = parseDate(value);
  if (!d || isNaN(d.getTime())) return '-';

  return d.toLocaleString('mn-MN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Ulaanbaatar',
  });
};
