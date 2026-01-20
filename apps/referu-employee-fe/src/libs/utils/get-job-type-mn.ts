import { EmployeeJobType } from '../type';

export function getJobTypeMN(type: EmployeeJobType): string {
  switch (type) {
    case 'FULL_TIME':
      return 'Бүтэн цагийн';
    case 'PART_TIME':
      return 'Бүтэн бус цагийн';
    case 'ROSTER':
      return 'Уртын ээлжийн';
    case 'SHIFT':
      return 'Ээлжийн';
    case 'REMOTE':
      return 'Гэрээсээ / зайнаас ажиллах';
    case 'SEASONAL':
      return 'Улирлын';
    case 'OTHER':
      return 'Бусад';
    default:
      return type;
  }
}
