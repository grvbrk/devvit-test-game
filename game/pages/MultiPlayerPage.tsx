import { useEffect, useState } from 'react';
import { useSetPage } from '../hooks/usePage';
import { sendToDevvit } from '../utils';
import { useDevvitListener } from '../hooks/useDevvitListener';

export const MultiPlayerPage = () => {
  // const { gameSettings, setGameSettings } = useGameSettings();
  const setPage = useSetPage();

  const [opponent, setOpponent] = useState(null);
  const opponentData = useDevvitListener('FIND_OPPONENT_RESPONSE');

  useEffect(() => {
    sendToDevvit({ type: 'FIND_OPPONENT_REQUEST' });
  });

  useEffect(() => {
    setOpponent(opponentData);
  }, [opponentData]);

  return (
    <div
      className="flex h-full flex-col items-center justify-center text-slate-900"
      style={{
        backgroundImage: `url("/bg-texture.jpg")`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%)',
        }}
      />
    </div>
  );
};
