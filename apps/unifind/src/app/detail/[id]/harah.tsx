'use client';
import { Major, University } from 'apps/unifind/src/lib/types/type';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Props {
  params: { id: string };
}

export default function UniversityDetailPage2({ params }: Props) {
  const uniId = Number(params.id);

  // 1️⃣ Их сургуулийн мэдээлэл
  const { data: uniData, error: uniError, isLoading: uniLoading } = useSWR<University>(`/api/universities?university_id=${uniId}`, fetcher);

  // 2️⃣ Тухайн их сургуульд хамаарах мэргэжлүүд
  const { data: majors, error: majorsError, isLoading: majorsLoading } = useSWR<Major[]>(`/api/majors?university_id=${uniId}`, fetcher);

  if (uniLoading || majorsLoading) return <p>Уншиж байна...</p>;
  if (uniError || majorsError) return <p>Өгөгдөл авахад алдаа гарлаа</p>;
  if (!uniData) return <p>Их сургуулийн мэдээлэл олдсонгүй</p>;
  console.log({ uniData });
  console.log({ majors });
  return (
    <div>
      <h2>Мэргэжлүүд ба Тухайн их сургууль</h2>
      <ul>
        {majors?.map((major) => (
          <li key={major.id} className="mb-4 border-b pb-2">
            <h3 className="font-semibold text-lg">
              {major.name} ({major.degree_type})
            </h3>
            <p>Их сургууль: {major.universities?.name ?? 'Мэдээлэл олдсонгүй'}</p>
            <p>Хот: {major.universities?.city ?? 'Мэдээлэл олдсонгүй'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
