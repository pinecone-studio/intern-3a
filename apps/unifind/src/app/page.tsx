'use client';

import { useEffect, useState } from 'react';

export default function Index() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('/api/universities')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  console.log({ data });

  return <div className="bg-red-200">bnn</div>;
}
