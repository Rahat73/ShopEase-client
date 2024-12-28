"use client";

import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa6";

interface CountdownTimerProps {
  endDate: Date | string;
}

export default function CountdownTimer({ endDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(endDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });

        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div className="w-full max-w-md mx-auto p-4 backdrop-blur-xl rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <FaClock className="w-5 h-5 text-green-500" />
        <h2 className="text-xl font-medium">Sales Ends in</h2>
      </div>

      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="flex flex-col items-center">
          <span className="text-4xl font-bold tabular-nums">
            {String(timeLeft.days).padStart(2, "0")}
          </span>
          <span className="text-sm ">Days</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-4xl font-bold tabular-nums">
            {String(timeLeft.hours).padStart(2, "0")}
          </span>
          <span className="text-sm ">Hours</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-4xl font-bold tabular-nums">
            {String(timeLeft.minutes).padStart(2, "0")}
          </span>
          <span className="text-sm ">Mins</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-4xl font-bold tabular-nums">
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
          <span className="text-sm ">Secs</span>
        </div>
      </div>
    </div>
  );
}
