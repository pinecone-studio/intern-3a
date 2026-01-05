"use client";

import { useEffect, useState } from "react";

type Scholarship = {
  title: string;
  link: string;
  image?: string;
};

export default function ScholarshipsPage() {
  const [data, setData] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/tetgeleg")
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setError("Мэдээлэл ачаалж чадсангүй");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="text-center p-10 text-gray-500">Ачаалж байна...</div>
    );

  if (error)
    return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🎓 Тэтгэлгийн мэдээнүүд</h1>

      <ul className="grid gap-6 md:grid-cols-2">
        {data.map((item, i) => (
          <li
            key={i}
            className="border rounded-xl overflow-hidden bg-white hover:shadow-md transition"
          >
            {/* IMAGE */}
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-44 object-cover"
              />
            )}

            {/* CONTENT */}
            <div className="p-4">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-medium text-blue-600 hover:underline"
              >
                {item.title}
              </a>
            </div>
          </li>
        ))}
      </ul>

      {data.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          Одоогоор тэтгэлгийн мэдээлэл алга байна.
        </p>
      )}
    </div>
  );
}
