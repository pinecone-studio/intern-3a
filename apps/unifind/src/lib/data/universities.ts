export type University = {
  id: number;
  name: string;
  location: string;
  image: string;
  status: string;
  minScore: string;
  admissionRate: string;
  deadline: string;
  nextCycle: string;
  about: string[];
  stats: {
    admissionRate: string;
    avgScore: string;
    students: string;
    tuition: string;
  };
  majors: {
    name: string;
    faculty: string;
    minScore: string;
    competition: number;
  }[];
  admissions: {
    phone: string;
    email: string;
    hours: string;
  };
};

export const universities: University[] = [
  {
    id: 1,
    name: "Монгол Улсын Их Сургууль",
    location: "Улаанбаатар, Монгол",
    image: "/university-logo-arts.jpg",
    status: "Төрийн",
    minScore: "500+",
    admissionRate: "65%",
    deadline: "2025-07-01",
    nextCycle: "2025 намар",

    about: [
      "Монгол Улсын хамгийн ууган их сургууль.",
      "Олон улсын стандартад нийцсэн сургалттай.",
    ],

    stats: {
      admissionRate: "65%",
      avgScore: "580",
      students: "18,000+",
      tuition: "$1,500",
    },

    majors: [
      {
        name: "Компьютерийн шинжлэх ухаан",
        faculty: "Инженер",
        minScore: "600",
        competition: 78,
      },
      {
        name: "Бизнесийн удирдлага",
        faculty: "Бизнес",
        minScore: "570",
        competition: 65,
      },
    ],

    admissions: {
      phone: "+976 11 123456",
      email: "admission@num.edu.mn",
      hours: "Даваа–Баасан 09:00–17:00",
    },
  },
  {
    id: 2,
    name: "Шинжлэх Ухаан Технологийн Их Сургууль",
    location: "Улаанбаатар, Монгол",
    image: "/university-logo-tech.jpg",
    status: "Төрийн",
    minScore: "560+",
    admissionRate: "70%",
    deadline: "2025-07-05",
    nextCycle: "2025 намар",

    about: ["Инженер, технологийн чиглэлээр тэргүүлэгч."],

    stats: {
      admissionRate: "70%",
      avgScore: "560",
      students: "22,000+",
      tuition: "$1,200",
    },

    majors: [
      {
        name: "Механик инженер",
        faculty: "Инженер",
        minScore: "590",
        competition: 72,
      },
      {
        name: "Компьютерийн шинжлэх ухаан",
        faculty: "Инженер",
        minScore: "600",
        competition: 78,
      },
      {
        name: "Компьютерийн шинжлэх ухаан",
        faculty: "Инженер",
        minScore: "600",
        competition: 78,
      },
      {
        name: "Компьютерийн шинжлэх ухаан",
        faculty: "Инженер",
        minScore: "600",
        competition: 78,
      },
    ],

    admissions: {
      phone: "+976 11 654321",
      email: "info@must.edu.mn",
      hours: "Даваа–Баасан 09:00–17:00",
    },
  },
  {
    id: 3,
    name: "Анагаахын Шинжлэх Ухааны Их Сургууль",
    location: "Улаанбаатар, Монгол",
    image: "/university-logo-medical.jpg",
    status: "Төрийн",
    minScore: "580+",
    admissionRate: "60%",
    deadline: "2025-06-30",
    nextCycle: "2025 намар",

    about: ["Эрүүл мэнд, анагаахын чиглэлээр мэргэжилтэн бэлтгэдэг."],

    stats: {
      admissionRate: "60%",
      avgScore: "580",
      students: "8,000+",
      tuition: "$1,800",
    },

    majors: [
      { name: "Эмч", faculty: "Эм зүй", minScore: "590", competition: 80 },
      {
        name: "Нийгмийн эрүүл мэнд",
        faculty: "Эрүүл мэнд",
        minScore: "580",
        competition: 70,
      },
    ],

    admissions: {
      phone: "+976 11 987654",
      email: "admission@msu.edu.mn",
      hours: "Даваа–Баасан 09:00–17:00",
    },
  },
  {
    id: 4,
    name: "Хүмүүнлэгийн Ухааны Их Сургууль",
    location: "Улаанбаатар, Монгол",
    image: "/university-logo-business.jpg",
    status: "Төрийн",
    minScore: "550+",
    admissionRate: "68%",
    deadline: "2025-07-10",
    nextCycle: "2025 намар",

    about: ["Хүмүүнлэг, нийгмийн шинжлэх ухааны чиглэлээр тэргүүлэгч."],

    stats: {
      admissionRate: "68%",
      avgScore: "560",
      students: "12,000+",
      tuition: "$1,000",
    },

    majors: [
      {
        name: "Сэтгүүл зүй",
        faculty: "Хүмүүнлэг",
        minScore: "550",
        competition: 60,
      },
      {
        name: "Олон улсын харилцаа",
        faculty: "Хүмүүнлэг",
        minScore: "560",
        competition: 62,
      },
    ],

    admissions: {
      phone: "+976 11 345678",
      email: "admission@hu.edu.mn",
      hours: "Даваа–Баасан 09:00–17:00",
    },
  },
  {
    id: 5,
    name: "Эдийн Засгийн Их Сургууль",
    location: "Улаанбаатар, Монгол",
    image: "/university-logo-business.jpg",
    status: "Төрийн",
    minScore: "570+",
    admissionRate: "66%",
    deadline: "2025-07-08",
    nextCycle: "2025 намар",

    about: ["Эдийн засаг, бизнесийн чиглэлээр мэргэжилтэн бэлтгэдэг."],

    stats: {
      admissionRate: "66%",
      avgScore: "570",
      students: "10,000+",
      tuition: "$1,300",
    },

    majors: [
      { name: "Санхүү", faculty: "Бизнес", minScore: "580", competition: 68 },
      {
        name: "Маркетинг",
        faculty: "Бизнес",
        minScore: "570",
        competition: 65,
      },
    ],

    admissions: {
      phone: "+976 11 223344",
      email: "admission@econ.edu.mn",
      hours: "Даваа–Баасан 09:00–17:00",
    },
  },
  {
    id: 6,
    name: "Технологийн Их Сургууль",
    location: "Улаанбаатар, Монгол",
    image: "/university-logo-business.jpg",
    status: "Төрийн",
    minScore: "560+",
    admissionRate: "72%",
    deadline: "2025-07-12",
    nextCycle: "2025 намар",

    about: ["Инженер, технологийн чиглэлээр мэргэжилтэн бэлтгэдэг."],

    stats: {
      admissionRate: "72%",
      avgScore: "560",
      students: "15,000+",
      tuition: "$1,200",
    },

    majors: [
      {
        name: "Электрон инженер",
        faculty: "Инженер",
        minScore: "570",
        competition: 70,
      },
      {
        name: "Програм хангамж",
        faculty: "Инженер",
        minScore: "580",
        competition: 75,
      },
    ],

    admissions: {
      phone: "+976 11 556677",
      email: "admission@tech.edu.mn",
      hours: "Даваа–Баасан 09:00–17:00",
    },
  },
  {
    id: 7,
    name: "Удирдлагын Академи",
    location: "Улаанбаатар, Монгол",
    image: "/university-logo-business.jpg",
    status: "Төрийн",
    minScore: "550+",
    admissionRate: "64%",
    deadline: "2025-07-15",
    nextCycle: "2025 намар",

    about: ["Бизнес, менежмент, удирдлагын чиглэлээр мэргэжилтэн бэлтгэдэг."],

    stats: {
      admissionRate: "64%",
      avgScore: "555",
      students: "6,000+",
      tuition: "$1,100",
    },

    majors: [
      {
        name: "Бизнес удирдлага",
        faculty: "Бизнес",
        minScore: "550",
        competition: 60,
      },
    ],

    admissions: {
      phone: "+976 11 778899",
      email: "admission@management.edu.mn",
      hours: "Даваа–Баасан 09:00–17:00",
    },
  },
  {
    id: 8,
    name: "Эрх зүйн Их Сургууль",
    location: "Улаанбаатар, Монгол",
    image: "/university-logo-business.jpg",
    status: "Төрийн",
    minScore: "560+",
    admissionRate: "67%",
    deadline: "2025-07-20",
    nextCycle: "2025 намар",

    about: ["Эрх зүй, хууль, эрх зүйн чиглэлээр мэргэжилтэн бэлтгэдэг."],

    stats: {
      admissionRate: "67%",
      avgScore: "560",
      students: "5,500+",
      tuition: "$1,250",
    },

    majors: [
      {
        name: "Хууль зүй",
        faculty: "Эрх зүй",
        minScore: "565",
        competition: 65,
      },
    ],

    admissions: {
      phone: "+976 11 334455",
      email: "admission@law.edu.mn",
      hours: "Даваа–Баасан 09:00–17:00",
    },
  },
  {
    id: 9,
    name: "Боловсролын Их Сургууль",
    location: "Улаанбаатар, Монгол",
    image: "/university-logo-business.jpg",
    status: "Төрийн",
    minScore: "540+",
    admissionRate: "70%",
    deadline: "2025-07-18",
    nextCycle: "2025 намар",

    about: ["Багш бэлтгэх чиглэлээр тэргүүлэгч."],

    stats: {
      admissionRate: "70%",
      avgScore: "545",
      students: "7,500+",
      tuition: "$1,100",
    },

    majors: [
      {
        name: "Багшлах ур чадвар",
        faculty: "Боловсрол",
        minScore: "540",
        competition: 60,
      },
    ],

    admissions: {
      phone: "+976 11 667788",
      email: "admission@edu.edu.mn",
      hours: "Даваа–Баасан 09:00–17:00",
    },
  },
  {
    id: 10,
    name: "Соёл Урлагийн Их Сургууль",
    location: "Улаанбаатар, Монгол",
    image: "/university-logo-business.jpg",
    status: "Төрийн",
    minScore: "550+",
    admissionRate: "65%",
    deadline: "2025-07-22",
    nextCycle: "2025 намар",

    about: ["Соёл урлаг, дизайн, урлагийн чиглэлээр мэргэжилтэн бэлтгэдэг."],

    stats: {
      admissionRate: "65%",
      avgScore: "555",
      students: "4,500+",
      tuition: "$1,200",
    },

    majors: [
      {
        name: "График дизайн",
        faculty: "Дизайн",
        minScore: "550",
        competition: 60,
      },
      {
        name: "Театр урлаг",
        faculty: "Урлаг",
        minScore: "550",
        competition: 58,
      },
    ],

    admissions: {
      phone: "+976 11 998877",
      email: "admission@arts.edu.mn",
      hours: "Даваа–Баасан 09:00–17:00",
    },
  },
];
