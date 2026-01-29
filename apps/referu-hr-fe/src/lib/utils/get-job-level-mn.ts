import { EmployeeJobLevel } from '../type';

export function getJobLevelMN(level: EmployeeJobLevel): string {
  switch (level) {
    case 'EXECUTIVE':
      return 'Гүйцэтгэх удирдлага';
    case 'UNIT_DIRECTOR':
      return 'Нэгжийн захирал';
    case 'UNIT_HEAD':
      return 'Нэгжийн дарга';
    case 'SENIOR_MANAGER':
      return 'Ахлах менежер';
    case 'MANAGER':
      return 'Менежер';
    case 'SENIOR_SPECIALIST':
      return 'Ахлах мэргэжилтэн';
    case 'SPECIALIST':
      return 'Мэргэжилтэн';
    case 'SENIOR_STAFF':
      return 'Ахлах ажилтан';
    case 'EMPLOYEE':
      return 'Ажилтан';
    case 'INTERN':
      return 'Дадлагажигч';
    case 'OTHER':
      return 'Бусад';
    default:
      return level;
  }
}
