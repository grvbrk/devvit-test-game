import { h1 } from "motion/react-client"
import { isVowel } from "../utils"
import NeoButton from "./ui/neo-button"


type QuizCardType = {
  answer: string
}

export default function QuizCard({ answer }: QuizCardType) {
  const letters = answer.split("")
  return (

    <>
      <div className="flex gap-2">

        {letters.map((letter, idx) => {
          return <AlphabetSlot key={letter + idx} letter={letter} />
        })}
      </div>
    </>
  )
}
function AlphabetSlot({ letter }: { letter: string }) {
  const vowel = isVowel(letter)
  const space = letter == " "

  return (
    <>
      {space ? <div className="w-5" /> : vowel ? <NeoButton className={`
              w-14 h-14 rounded-xl font-semibold text-xl
              transition-all duration-200
            `}>{letter}</NeoButton > : <NeoButton className={`
              w-14 h-14  rounded-xl font-semibold text-lg
              transition-all duration-200
            `}></NeoButton>}
    </>
  )
}

