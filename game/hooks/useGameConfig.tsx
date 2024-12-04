import { createContext, useContext, useState } from 'react';

type GameSettings = {
  difficulty: 'easy' | 'medium' | 'hard';
  timeInSeconds: number;
};

type GameSettingsContextType = {
  gameSettings: GameSettings;
  setGameSettings: React.Dispatch<React.SetStateAction<GameSettings>>;
};

const GameSettingsContext = createContext<GameSettingsContextType | null>(null);

export default function GameSettingsProvider({ children }: { children: React.ReactNode }) {
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    difficulty: 'easy',
    timeInSeconds: 60,
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
  return context.gameSettings;
};

export const useSetGameSettings = () => {
  const context = useContext(GameSettingsContext);
  if (context === null) {
    throw new Error('useSetGameSettings must be used within a GameSettingsProvider');
  }
  return context.setGameSettings;
};
