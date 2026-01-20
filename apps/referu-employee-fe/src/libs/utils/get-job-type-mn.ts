import { EmployeeJobType } from '../type';

export function getJobTypeMN(type: EmployeeJobType): string {
  switch (type) {
    case 'FULL_TIME':
      return 'Бүтэн цагийн';
    case 'PART_TIME':
      return 'Цагийн ажил';
    case 'SHIFT_BASED':
      return 'Ээлжийн';
    case 'SEASONAL':
      return 'Улирлын';
    case 'CONTRACT':
      return 'Гэрээт';
    case 'TEMPORARY':
      return 'Бусад';
    case 'OTHER':
      return 'Түр ажил';
    default:
      return type;
  }
}
