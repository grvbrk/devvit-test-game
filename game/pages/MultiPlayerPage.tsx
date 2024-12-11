import { useEffect, useState } from 'react';
import { generateMultiplayerQuestions, sendToDevvit } from '../utils';
import { useDevvitListener } from '../hooks/useDevvitListener';
import SquareLoader from 'react-spinners/SquareLoader';
import { Card, CardContent } from '../components/ui/card';
import MultiplayerGameMain from '../components/PlayMultiplayerGame';
import useUserStore from '../stores';
import { UserRecord } from '../shared';

export const MultiPlayerPage = ({ currentUser }: { currentUser: UserRecord }) => {
  const [opponentFound, setOpponentFound] = useState(false);
  const opponentData = useDevvitListener('FIND_OPPONENT_RESPONSE');
  const updateUserState = useUserStore((state) => state.updateUserState);
  const updateOpponentState = useUserStore((state) => state.updateOpponentState);

  useEffect(() => {
    sendToDevvit({ type: 'FIND_OPPONENT_REQUEST' });
  });

  useEffect(() => {
    if (opponentData) {
      updateUserState({
        username: currentUser.name,
        userLives: 5,
        userQuestions: generateMultiplayerQuestions(),
        userLevel: 1,
        guessedLetters: [],
        gameStatus: 'waiting',
      });
      updateOpponentState({
        opponentUsername: opponentData?.opponentUsername,
        opponentLives: 5,
        opponentLevel: 1,
        opponentGameStatus: 'waiting',
      });
      setOpponentFound(true);
    }
  }, [opponentData]);

  return (
    <div
      className="flex h-full flex-col items-center justify-center text-white"
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
      {opponentFound ? (
        <div className="flex items-center justify-center border-2">
          <MultiplayerGameMain />
          {/* <OpponentUpdatesTracker /> */}
        </div>
      ) : (
        <FindingOppLoading currentUser={currentUser} />
      )}
    </div>
  );
};

function FindingOppLoading({ currentUser }: { currentUser: UserRecord }) {
  return (
    <Card className="border-none">
      <CardContent className="mt-6 grid gap-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            {/* TODO: Add Reddit user Avatar here */}
            {/* <Avatar>
              <AvatarFallback>OM</AvatarFallback>
            </Avatar> */}
            <div>
              <p className="text-sm font-medium leading-none">{currentUser.name}</p>
              <p className="text-sm text-muted-foreground">wins: 0</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div>
              <h1>VS</h1>
            </div>
            <SquareLoader size={15} color="white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
