import { useState, useEffect } from "react";

const TimeGreeting = () => {
  const [greeting, setGreeting] = useState("");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => {
      setTime(new Date());
      updateGreeting(new Date());
    }, 60000);

    // Initial greeting
    updateGreeting(time);

    // Cleanup interval on unmount
    return () => clearInterval(timer);
  }, []);

  const updateGreeting = (currentTime: Date) => {
    const hours = currentTime.getHours();

    let greetingText = "";

    if (hours >= 5 && hours < 12) {
      greetingText = "Good Morning";
    } else if (hours >= 12 && hours < 17) {
      greetingText = "Good Afternoon";
    } else if (hours >= 17 && hours < 21) {
      greetingText = "Good Evening";
    } else {
      greetingText = "Good Night";
    }

    setGreeting(`${greetingText} `);
  };

  return (
    <div className="">
      <div className="flex flex-col">
        <h1 className="uppercase text-lg font-semibold">{greeting}</h1>
        <p className="text-xs opacity-90">
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </div>
  );
};

export { TimeGreeting };
