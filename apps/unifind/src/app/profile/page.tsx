"use client";

import { useUser } from "@clerk/nextjs";
import TeamCalendar from "../_components/Teamcalendar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/");
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) return null;

  if (!user) return null;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">
        Таны хувийн календарь {user?.lastName}
      </h1>

      <TeamCalendar userId={1} />
    </div>
  );
};

export default Page;
