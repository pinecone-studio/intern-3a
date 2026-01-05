"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/hello")
      .then((hariu) => hariu.json())
      .then((hariu) => setMessage(hariu.ilgeeh));
  }, []);

  return <h1 className="mt-50 text-black">{message}</h1>;
}
