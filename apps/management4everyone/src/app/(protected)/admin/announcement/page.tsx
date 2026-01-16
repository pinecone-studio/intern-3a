'use client';

import React, { useState } from 'react';

const page = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  console.log('title and content', title, content);

  const handleSubmit = async () => {
    if (!title || !content) {
      alert('Гарчиг болон мэдээлэл хоосон байж болохгүй!');
    }
    const response = await fetch('/api/admin/announcements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });
    if (response.ok) {
      alert('Амжилттай хадгалагдлаа!');
      setTitle('');
      setContent('');
    }
  };
  return (
    <>
      <div className="w-100 h-200 flex flex-col items-center justify-center gap-4 bg-amber-400">
        <p>Та өөрийн мэдэгдлээ оруулна уу</p>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Гарчигаа оруулна уу" />
        <input type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Мэдээллээ оруулна уу" />
        <button onClick={handleSubmit}>Мэдээллээ хадгалах</button>
      </div>
    </>
  );
};

export default page;
