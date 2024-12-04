import { useSetPage } from '../hooks/usePage';
import Snowfall from '../components/Snowfall';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { Card, CardHeader, CardTitle } from '../components/ui/card';
import NeoButton from '../components/ui/neo-button';
import { cn } from '../utils';
import { useState } from 'react';

export const HomePage = ({ postId }: { postId: string }) => {
  const setPage = useSetPage();
  const [activeKey, setActiveKey] = useState<boolean>(false);

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
      <div className="flex w-[300px] items-center justify-center">
        <Card className="w-fit border-none text-[#fc6] shadow-none">
          <CardHeader className="px-4 py-2">
            <CardTitle className="flex">
              <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" className="" />
                  <Label htmlFor="option-one">Easy</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-two" id="option-two" />
                  <Label htmlFor="option-two">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-three" id="option-three" />
                  <Label htmlFor="option-three">Hard</Label>
                </div>
              </RadioGroup>
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="mb-auto w-fit border-none text-[#fc6] shadow-none">
          <CardHeader className="px-4 py-2">
            <CardTitle className="flex">
              <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" className="" />
                  <Label htmlFor="option-one">Timer</Label>
                </div>
              </RadioGroup>
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <NeoButton
        onClick={() => {
          setPage('pokemon');
        }}
        className={cn(
          `shadow-box w-36 rounded-xl bg-[#fc6] text-lg font-semibold text-slate-900 transition-all`,
          activeKey ? 'translate-x-boxShadowX translate-y-boxShadowY shadow-none' : ''
        )}
        onMouseDown={() => {
          setActiveKey(true);
        }}
        onMouseUp={() => {
          setActiveKey(false);
        }}
      >
        Play now
      </NeoButton>
    </div>
  );
};

{
  /* <p className="relative z-20 mb-4 mt-2 text-center text-neutral-300">PostId: {postId}</p> */
}
