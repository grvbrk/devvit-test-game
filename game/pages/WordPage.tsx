import { useState } from 'react';
import { PlaceholdersAndVanishInput } from '../components/WordInput';
import { isVowel, sendToDevvit } from '../utils';
import { useDevvitListener } from '../hooks/useDevvitListener';
import { questionsList, QuestionType } from '../questions';
import QuizCard from '../components/QuizCard';
import NeoButton from '../components/ui/neo-button';
import { Card } from '../components/ui/card';

export const WordPage = () => {
  const [question, setQuestion] = useState(generateRandomQuestion(questionsList))
  const [lives, setLives] = useState(3)
  const [gameCompleted, setGameCompleted] = useState(false);
  return (
    <Card className="flex h-full flex-col items-center justify-center gap-6 p-6 bg-yellow-100">
      <h1>{question.question}</h1>
      <QuizCard answer={question.answer} />
      <AlphabetList />
    </Card>
  );
};

function generateRandomQuestion(questions: QuestionType[]) {
  return questions[Math.floor(Math.random() * questions.length)];
}

function AlphabetList() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return <div className="flex flex-wrap gap-2 justify-center max-w-2xl">
    {alphabet.map((letter) => {
      // const isVowel = vowels.has(letter);
      // const isUsed = usedLetters.has(letter);
      // const isCorrect = correctLetters.has(letter);

      return (
        <NeoButton
          key={letter}
          className={`
              w-10 h-10 rounded-xl font-semibold text-lg
              transition-all duration-200
            `}
        >
          {letter}
        </NeoButton>
      );
    })}
  </div>
}




// const [value, setValue] = useState('');
// const [loading, setLoading] = useState(false);
// const pokemon = useDevvitListener('GET_POKEMON_RESPONSE');

{/* <PlaceholdersAndVanishInput
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
      )} */}