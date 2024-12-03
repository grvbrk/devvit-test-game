import { useSetPage } from '../hooks/usePage';
import { Button } from '../components/ui/button';
import Snowfall from '../components/Snowfall';

export const HomePage = ({ postId }: { postId: string }) => {
  const setPage = useSetPage();

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-slate-900">
      <Snowfall />

      <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-5xl">
        Wordlet
      </h1>

      <p className="relative z-20 mb-4 mt-2 text-center text-neutral-300">PostId: {postId}</p>
      <Button
        onClick={() => {
          setPage('pokemon');
        }}
      >
        Play now
      </Button>
    </div>
  );
};


