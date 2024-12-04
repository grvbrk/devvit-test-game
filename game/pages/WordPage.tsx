import { useEffect, useState } from 'react';
import { alphabet, cn, generateRandomQuestion, isVowel } from '../utils';
import NeoButton from '../components/ui/neo-button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Heart } from 'lucide-react';

export const WordPage = () => {
  const [question] = useState(generateRandomQuestion());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [lives, setLives] = useState<number>(5);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1] ?? null;
  const answerLetters = question.answer.split('');

  useEffect(() => {
    if (guessedLetters.includes(lastGuessedLetter) && !answerLetters.includes(lastGuessedLetter)) {
      setLives((prev) => prev - 1);
    }
  }, [guessedLetters]);

  return (
    <div
      className="flex h-full flex-col items-center justify-center gap-6 text-slate-900"
      style={{
        backgroundImage: `url("/bg-texture.jpg")`,
      }}
    >
      <div className="flex w-[550px]">
        <Card className={`shadow-box h-10 w-fit bg-[#fc6] ${lives > 0 ? 'flex' : 'invisible'}`}>
          <CardHeader className="px-4 py-2 text-slate-900">
            <CardTitle className="flex">
              {Array.from({ length: lives }, () => {
                return <Heart size={18} fill="red" />;
              })}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card
          className={`shadow-box ml-auto h-10 w-fit bg-[#fc6] ${lives > 0 ? 'flex' : 'invisible'}`}
        >
          <CardHeader className="px-4 py-2 text-slate-900">
            <CardTitle className="flex">Timer:</CardTitle>
          </CardHeader>
        </Card>
      </div>
      <Card className="w-[550px] bg-[#fc6] shadow-dark">
        <CardHeader className="flex items-center justify-center p-6 text-slate-900">
          <CardTitle className="text-xl">{question.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-2 text-2xl text-slate-900">
            {answerLetters.map((letter, idx) => {
              return (
                <AlphabetSlot
                  key={letter + idx}
                  letter={letter}
                  guessed={guessedLetters.includes(letter)}
                />
              );
            })}
          </div>
        </CardContent>
      </Card>
      <Card className="w-[550px] border-none p-4 shadow-none">
        <AlphabetList
          setGuessedLetters={setGuessedLetters}
          guessedLetters={guessedLetters}
          answerLetters={answerLetters}
        />
      </Card>
    </div>
  );
};

function AlphabetList({
  guessedLetters,
  setGuessedLetters,
  answerLetters,
}: {
  guessedLetters: string[];
  setGuessedLetters: React.Dispatch<React.SetStateAction<string[]>>;
  answerLetters: string[];
}) {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      if (isVowel(key) || guessedLetters.includes(key)) {
        return;
      }
      if (alphabet.includes(key)) {
        setActiveKey(key);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      if (!isVowel(key) && alphabet.includes(key)) {
        setGuessedLetters((prev) => (prev.includes(key) ? prev : [...prev, key]));
      }
      setActiveKey(null);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [alphabet]);

  return (
    <div className="flex max-w-2xl flex-wrap justify-center gap-2">
      {alphabet.map((letter) => {
        return (
          <NeoButton
            key={letter}
            className={cn(
              `h-10 w-10 rounded-xl text-lg font-semibold text-slate-900`,
              isVowel(letter) && 'bg-slate-500 text-white',
              activeKey === letter
                ? 'translate-x-boxShadowX translate-y-boxShadowY shadow-none'
                : '',
              guessedLetters.includes(letter) && answerLetters.includes(letter)
                ? 'bg-green-500'
                : guessedLetters.includes(letter) && !answerLetters.includes(letter)
                  ? 'bg-red-500'
                  : ''
            )}
            disabled={isVowel(letter) || guessedLetters.includes(letter)}
            onMouseDown={() => {
              setActiveKey(letter);
            }}
            onMouseUp={() => {
              setGuessedLetters((prev) => {
                return prev.includes(letter) ? prev : [...prev, letter];
              });
              setActiveKey(null);
            }}
          >
            {letter}
          </NeoButton>
        );
      })}
    </div>
  );
}

function AlphabetSlot({ letter, guessed }: { letter: string; guessed: boolean }) {
  const vowel = isVowel(letter);
  const space = letter == ' ';

  return (
    <>
      {space ? (
        <div className="w-5" />
      ) : vowel ? (
        <div className="flex h-10 w-10 items-center justify-center border-b-2 font-semibold">
          {letter}
        </div>
      ) : (
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center border-b-2 font-semibold',
            guessed && 'text-green-600'
          )}
        >
          {guessed && letter}
        </div>
      )}
    </>
  );
}

// const [value, setValue] = useState('');
// const [loading, setLoading] = useState(false);
// const pokemon = useDevvitListener('GET_POKEMON_RESPONSE');

{
  /* <PlaceholdersAndVanishInput
        placeholders={['Try ditto', 'Try pikachu', 'Try bulbasaur']}
        onChange={(e) => setValue(e.target.value)}
        onSubmit={() => {
          setLoading(true);
          sendToDevvit({
            type: 'GET_POKEMON_REQUEST',
            payload: { name: value.trim().toLowerCase() },
          });
        }}
      />
      {loading && !pokemon ? (
        <div className="text-center text-white">Loading...</div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-white">Pokemon Number: {pokemon?.number}</p>
        </div>
      )} */
}
