import { useEffect, useMemo, useState } from 'react';
import { generateRandomQuestion, isVowel } from '../utils';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Heart, MoveLeft, RotateCcw } from 'lucide-react';
import { useGameSettings } from '../hooks/useGameConfig';
import { Button } from '../components/ui/button';
import { useSetPage } from '../hooks/usePage';
import Timer from '../components/Timer';
import Confetti from 'react-confetti';
import AlphabetList from '../components/AlphabetList';
import { AlphabetSlot } from '../components/AlphabetSlot';

export const SinglePlayerPage = () => {
  const { gameSettings, setGameSettings } = useGameSettings();
  const setPage = useSetPage();
  const [question, setQuestion] = useState(
    useMemo(() => generateRandomQuestion(gameSettings.difficulty), [gameSettings.difficulty])
  );

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [lives, setLives] = useState<number>(gameSettings.startingLives);
  const [timeRemaining, setTimeRemaining] = useState<number>(gameSettings.gameTimeInSeconds);

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1] ?? null;

  const answerLetters = useMemo(() => question.answer.split(''), [question.answer]);

  const uniqueAnswerLetters = useMemo(() => {
    return [
      ...new Set(question.answer.split('').filter((letter) => letter !== ' ' && !isVowel(letter))),
    ];
  }, [question.answer]);

  let isGameWon = useMemo(
    () => uniqueAnswerLetters.every((letter) => guessedLetters.includes(letter)),
    [uniqueAnswerLetters, guessedLetters]
  );

  let isGameLost = useMemo(() => lives === 0, [lives]);
  let isGameOver = useMemo(() => isGameLost || isGameWon, [isGameLost, isGameWon]);

  useEffect(() => {
    if (
      lastGuessedLetter &&
      !answerLetters.includes(lastGuessedLetter) &&
      guessedLetters.includes(lastGuessedLetter)
    ) {
      setLives((prev) => {
        return prev - 1;
      });
    }
  }, [lastGuessedLetter, guessedLetters, answerLetters]);

  useEffect(() => {
    if (isGameOver) {
      setGameSettings((prevSettings) => ({ ...prevSettings, isGameOver: true }));
    }
  }, [isGameOver, setGameSettings]);

  function handleTimeEnd() {
    setLives(0);
  }

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
      <div className="flex h-[550px] flex-col items-center pt-8">
        <div className="flex w-[550px] items-center text-white">
          <Card className="border-none">
            <CardHeader className="py-2">
              <CardTitle className="flex gap-1">
                {Array.from({ length: gameSettings.startingLives }, (_, index) => {
                  const isFilled = index < lives;
                  return (
                    <Heart
                      key={index}
                      size={22}
                      fill={isFilled ? 'red' : 'white'}
                      className="text-black"
                    />
                  );
                })}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className={`ml-auto h-full border-none`}>
            <CardHeader className="px-4">
              <CardTitle>
                {isGameWon && (
                  <>
                    {/* <Snowfall /> */}
                    <Confetti recycle={false} />
                  </>
                )}
              </CardTitle>
            </CardHeader>
          </Card>

          {gameSettings.timer && (
            <Timer
              timeRemaining={timeRemaining}
              setTimeRemaining={setTimeRemaining}
              isGameOver={isGameOver}
              handleTimeEnd={handleTimeEnd}
            />
          )}
        </div>
        <Card className="w-[550px] bg-[#fc6]">
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
        <div>
          {gameSettings.isGameOver && (
            <Card className="flex w-[350px] items-center justify-center gap-4 border-none p-4 shadow-none">
              <Button
                className="bg-[#fc6]"
                onClick={() => {
                  setGameSettings((prev) => {
                    return {
                      ...prev,
                      difficulty: gameSettings.difficulty,
                      timer: gameSettings.timer,
                      gameTimeInSeconds: gameSettings.gameTimeInSeconds,
                      timeTakenInSeconds: 0,
                      isGameOver: false,
                      // isGameWon: false,
                      // isGameLost: false,
                      startingLives: 5,
                      livesRemaining: 5,
                    };
                  });
                  setPage('home');
                }}
              >
                <MoveLeft />
                Return to Main Menu
              </Button>
              <Button
                className="bg-[#fc6]"
                onClick={() => {
                  setGameSettings((prev) => {
                    return {
                      ...prev,
                      difficulty: gameSettings.difficulty,
                      timer: gameSettings.timer,
                      gameTimeInSeconds: gameSettings.gameTimeInSeconds,
                      timeTakenInSeconds: 0,
                      isGameOver: false,
                      // isGameWon: false,
                      // isGameLost: false,
                      startingLives: 5,
                      livesRemaining: 5,
                    };
                  });

                  setQuestion(generateRandomQuestion(gameSettings.difficulty));
                  setGuessedLetters([]);
                  setLives(5);
                  setTimeRemaining(gameSettings.gameTimeInSeconds);
                }}
              >
                Play Again!
                <RotateCcw />
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

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
