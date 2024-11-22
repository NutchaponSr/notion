"use client";

import { 
  SunIcon, 
  MoonIcon, 
  SunsetIcon, 
  CoffeeIcon 
} from "lucide-react";
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
  let greeting, icon

  if (hour >= 5 && hour < 12) {
    greeting = "Good morning"
    icon = <CoffeeIcon className="w-6 h-6 text-yellow-500" />
  } else if (hour >= 12 && hour < 18) {
    greeting = "Good afternoon"
    icon = <SunIcon className="w-6 h-6 text-yellow-500" />
  } else if (hour >= 18 && hour < 22) {
    greeting = "Good evening"
    icon = <SunsetIcon className="w-6 h-6 text-orange-500" />
  } else {
    greeting = "Good night"
    icon = <MoonIcon className="w-6 h-6 text-blue-500" />
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative transition col-span-3">
      <div className="w-full h-full mt-16 px-[52px] transition">
        <div className="w-full h-full flex items-center justify-center">
          <h1 className="flex items-center gap-3 text-[30px] leading-[1.2] font-medium text-[#37352f] dark:text-[#ffffffcf]">
            {icon}
            <span>{greeting},</span>
            {name}
          </h1>
        </div>
      </div>
    </div>
  );
}