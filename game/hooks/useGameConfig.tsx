import { createContext, useContext, useState } from 'react';

type GameSettings = {
  difficulty: 'easy' | 'medium' | 'hard';
  timer: boolean;
  gameTimeInSeconds: number;
  timeTakenInSeconds: number;
  isGameOver: boolean;
  // isGameWon: boolean;
  // isGameLost: boolean;
  startingLives: number;
  livesRemaining: number;
};

type GameSettingsContextType = {
  gameSettings: GameSettings;
  setGameSettings: React.Dispatch<React.SetStateAction<GameSettings>>;
};

const GameSettingsContext = createContext<GameSettingsContextType | null>(null);

export default function GameSettingsProvider({ children }: { children: React.ReactNode }) {
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    timer: false,
    difficulty: 'easy',
    gameTimeInSeconds: 60,
    timeTakenInSeconds: 0,
    isGameOver: false,
    // isGameWon: false,
    // isGameLost: false,
    startingLives: 5,
    livesRemaining: 5,
  });

  return (
    <GameSettingsContext.Provider value={{ gameSettings, setGameSettings }}>
      {children}
    </GameSettingsContext.Provider>
  );
}

export const useGameSettings = () => {
  const context = useContext(GameSettingsContext);
  if (context === null) {
    throw new Error('useGameSettings must be used within a GameSettingsProvider');
  }
  return { gameSettings: context.gameSettings, setGameSettings: context.setGameSettings };
};
