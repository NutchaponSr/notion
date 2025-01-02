"use client";

import { getHours } from "date-fns";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const WelcomeMessage = () => {
  const { data } = useSession();

  const name = data?.user.name ?? "";

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const hour = getHours(currentTime)
  let greeting

  if (hour >= 5 && hour < 12) {
    greeting = "Good morning"
  } else if (hour >= 12 && hour < 18) {
    greeting = "Good afternoon"
  } else if (hour >= 18 && hour < 22) {
    greeting = "Good evening"
  } else {
    greeting = "Good night"
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative transition col-span-3">
      <div className="w-full h-full mt-16 px-[52px] transition">
        <div className="w-full h-full flex items-center justify-center">
          <h1 className="flex items-center gap-3 text-[30px] leading-[1.2] font-medium text-[#37352f] dark:text-[#ffffffcf]">
            <span>{greeting},</span>
            {name}
          </h1>
        </div>
      </div>
    </div>
  );
}