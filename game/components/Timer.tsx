import { useEffect } from 'react';
import { Card, CardHeader, CardTitle } from './ui/card';

export default function Timer({
  timeRemaining,
  setTimeRemaining,
  handleTimeEnd,
  isGameOver,
}: {
  timeRemaining: number;
  setTimeRemaining: React.Dispatch<React.SetStateAction<number>>;
  handleTimeEnd: () => void;
  isGameOver: boolean;
}) {
  useEffect(() => {
    if (isGameOver || timeRemaining === 0) return;

    const timer = setTimeout(() => {
      if (timeRemaining === 1) {
        handleTimeEnd();
      }
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeRemaining, isGameOver, handleTimeEnd]);

  return (
    <Card className={`ml-auto border-none`}>
      <CardHeader className="px-4">
        <CardTitle>Time: {formatTime(timeRemaining)}</CardTitle>
      </CardHeader>
    </Card>
  );
}

function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
