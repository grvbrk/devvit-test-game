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
    if (isGameOver) {
      return;
    }

    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          handleTimeEnd();
          clearInterval(intervalId);
          return 0;
        }

        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isGameOver]);

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
