export function jobLevelMNtoEN(value: string) {
  if (value === 'Гүйцэтгэх удирдлага') return 'EXECUTIVE';
  if (value === 'Нэгжийн захирал') return 'DIRECTOR';
  if (value === 'Нэгжийн дарга') return 'UNIT_HEAD';
  if (value === 'Ахлах менежер') return 'SENIOR MANAGER';
  if (value === 'Менежер') return 'MANAGER';
  if (value === 'Ахлах мэргэжилтэн') return 'SENIOR_SPECIALIST';
  if (value === 'Гүйцэтгэх удирдлага') return 'SPECIALIST';
  if (value === 'Гүйцэтгэх удирдлага') return 'SENIOR_STAFF';
  if (value === 'Гүйцэтгэх удирдлага') return 'EMPLOYEE';
  if (value === 'Гүйцэтгэх удирдлага') return 'INTERN';
  if (value === 'Гүйцэтгэх удирдлага') return 'OTHER';

  return value;
}

//   return 'Мэргэжилтэн';
// case 'SENIOR_STAFF':
//   return 'Ахлах ажилтан';
// case 'EMPLOYEE':
//   return 'Ажилтан';
// case 'INTERN':
//   return 'Дадлагажигч';
// case 'OTHER':
//   return 'Бусад';
// default:
