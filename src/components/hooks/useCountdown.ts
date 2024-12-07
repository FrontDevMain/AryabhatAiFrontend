import { useState, useEffect, useCallback } from "react";

function useCountdown(initialTime: number) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const resetTimer = useCallback(() => {
    setTimeLeft(initialTime);
    setIsRunning(false);
  }, [initialTime]);

  useEffect(() => {
    let intervalId: any;

    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime - 1 <= 0) {
            setIsRunning(false); // Stop when the countdown ends
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId); // Cleanup
  }, [isRunning, timeLeft]);

  return { timeLeft, isRunning, start, pause, resetTimer };
}

export default useCountdown;
