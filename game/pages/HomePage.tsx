import { useSetPage } from '../hooks/usePage';
import Snowfall from '../components/Snowfall';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { Card, CardDescription } from '../components/ui/card';
import NeoButton from '../components/ui/neo-button';
import { cn, sendToDevvit } from '../utils';
import { useState } from 'react';
import { useGameSettings } from '../hooks/useGameConfig';
import { Checkbox } from '../components/ui/checkbox';
import { MoveRight } from 'lucide-react';
import { useDevvitListener } from '../hooks/useDevvitListener';

export const HomePage = ({
  postId,
  users,
  currentUser,
}: {
  postId: string;
  users: any;
  currentUser: any;
}) => {
  const setPage = useSetPage();
  const { gameSettings, setGameSettings } = useGameSettings();
  const [activeKey, setActiveKey] = useState<boolean>(false);
  const data = useDevvitListener('GAME_CONFIG_RESPONSE');

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center gap-5 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url("/bg-texture.jpg")`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)',
        }}
      />
      <Snowfall />
      <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-5xl">Wordsworth</h1>
      <p className="relative z-20 mb-4 mt-2 text-center text-neutral-300">PostId: {postId}</p>
      <p className="relative z-20 mb-4 mt-2 text-center text-neutral-300">
        Current User: {JSON.stringify(currentUser)}
      </p>
      <p className="relative z-20 mb-4 mt-2 text-center text-neutral-300">
        Users: {JSON.stringify(users)}
      </p>
      <div className="flex w-[400px] items-center justify-center">
        <Card className="flex w-fit flex-col gap-4 border-none px-6 py-4 text-[#fc6] shadow-none">
          <CardDescription className="text-white">
            <RadioGroup
              defaultValue={gameSettings.difficulty}
              onValueChange={(value: 'easy' | 'medium' | 'hard') =>
                setGameSettings((prev) => {
                  return { ...prev, difficulty: value };
                })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="easy" id="option-one" />
                <Label htmlFor="option-one">Easy</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="option-two" />
                <Label htmlFor="option-two">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hard" id="option-three" />
                <Label htmlFor="option-three">Hard</Label>
              </div>
            </RadioGroup>
          </CardDescription>
        </Card>
        <Card className="flex w-fit flex-col gap-4 border-none px-6 py-4 text-[#fc6] shadow-none">
          <CardDescription className="flex items-center space-x-2 text-white">
            <Checkbox
              id="timer"
              checked={gameSettings.timer}
              onCheckedChange={(checked) =>
                setGameSettings((prev) => {
                  return { ...prev, timer: !!checked };
                })
              }
            />
            <Label
              htmlFor="timer"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Timer
            </Label>
          </CardDescription>
        </Card>
        <Card className="flex w-fit flex-col gap-4 border-none px-6 py-4 text-[#fc6] shadow-none">
          <CardDescription className="text-white">
            <RadioGroup
              defaultValue={gameSettings.mode}
              onValueChange={(value: 'singleplayer' | 'multiplayer') =>
                setGameSettings((prev) => {
                  return { ...prev, mode: value };
                })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="singleplayer" id="option-one" />
                <Label htmlFor="option-one">Single Player</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="multiplayer" id="option-two" />
                <Label htmlFor="option-two">Multi Player</Label>
              </div>
            </RadioGroup>
          </CardDescription>
        </Card>
      </div>

      {/* Start game button */}
      <NeoButton
        className={cn(
          `flex w-36 gap-2 rounded-xl py-2 text-lg font-semibold text-slate-900 shadow-light transition-all hover:bg-[#fc6]`,
          activeKey ? 'translate-x-boxShadowX translate-y-boxShadowY shadow-none' : ''
        )}
        onMouseDown={() => {
          setActiveKey(true);
        }}
        onMouseUp={() => {
          setActiveKey(false);
          if (gameSettings.mode === 'singleplayer') {
            setPage('singleplayerGame');
          }
          if (gameSettings.mode === 'multiplayer') {
            setPage('multiplayerGame');
            sendToDevvit({
              type: 'GAME_CONFIG_REQUEST',
              payload: { gameSettings: gameSettings },
            });
          }
        }}
      >
        Start Game
        <MoveRight size={20} className="mt-1" />
      </NeoButton>
    </div>
  );
};
