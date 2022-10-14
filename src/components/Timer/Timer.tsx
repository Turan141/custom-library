// Core
import React from 'react';

export interface TimerProps {
  className?: string;
  time?: number | string;
  onTick?: () => void;
  onFinish?: () => void;
}

const Timer: React.FC<TimerProps> = ({ time, onFinish, onTick, className }) => {
  const $timeout = React.useRef<any>(null)

  const [timeLeft, setTimeLeft] = React.useState(Number(time));

  const minutes = Math.floor(timeLeft/60);
  const seconds = timeLeft - minutes * 60;

  const handleTick = (time: number) => {
    setTimeLeft(time);

    if (time > 0) {
      onTick && onTick();
    } else {
      onFinish && onFinish();
    }
  };

  React.useEffect(() => {
    if (timeLeft > 0) {
      $timeout.current = setTimeout(handleTick, 1000, timeLeft - 1)
    }

    return () => clearTimeout($timeout.current)
  }, [timeLeft]);

  return (
    <span className={className}>{minutes}:{seconds<10 ? `0${seconds}` : seconds}</span>
  )
};

export default Timer;
