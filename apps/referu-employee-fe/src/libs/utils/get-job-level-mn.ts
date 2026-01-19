import { EmployeeJobLevel } from '../type';

export function getJobLevelMN(level: EmployeeJobLevel): string {
  switch (level) {
    case 'EXECUTIVE':
      return 'Удирдах';
    case 'SENIOR':
      return 'Ахлах';
    case 'MID_LEVEL':
      return 'Дунд шатны';
    case 'JUNIOR':
      return 'Анхан шатны';
    case 'CONTRACTOR':
      return 'Гэрээт';
    case 'INTERN':
      return 'Дадлагын';
    case 'VOLUNTEER':
      return 'Сайн дурын';
    case 'OTHER':
      return 'Бусад';
    default:
      return level;
  }
}
