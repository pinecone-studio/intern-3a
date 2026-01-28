export function jobLevelMNtoEN(value: string) {
  if (value === 'Гүйцэтгэх удирдлага') return 'EXECUTIVE';
  if (value === 'Нэгжийн захирал') return 'UNIT_DIRECTOR';
  if (value === 'Нэгжийн дарга') return 'UNIT_HEAD';
  if (value === 'Ахлах менежер') return 'SENIOR_MANAGER';
  if (value === 'Менежер') return 'MANAGER';
  if (value === 'Ахлах мэргэжилтэн') return 'SENIOR_SPECIALIST';
  if (value === 'Мэргэжилтэн') return 'SPECIALIST';
  if (value === 'Ахлах ажилтан') return 'SENIOR_STAFF';
  if (value === 'Ажилтан') return 'EMPLOYEE';
  if (value === 'Дадлагажигч') return 'INTERN';
  if (value === 'Бусад') return 'OTHER';

  return value;
}
