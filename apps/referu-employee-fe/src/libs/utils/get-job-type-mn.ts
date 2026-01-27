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
      return 'Түр ажил';
    case 'OTHER':
      return 'Бусад';
    default:
      return type;
  }
}
