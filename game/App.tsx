import { Page } from './shared';
import { WordPage } from './pages/WordPage';
import { HomePage } from './pages/HomePage';
import { usePage } from './hooks/usePage';
import { useEffect, useState } from 'react';
import { sendToDevvit } from './utils';
import { useDevvitListener } from './hooks/useDevvitListener';

const getPage = (page: Page, { postId, users }: { postId: string; users: any }) => {
  switch (page) {
    case 'home':
      return <HomePage postId={postId} users={users} />;
    case 'game':
      return <WordPage />;
    default:
      throw new Error(`Unknown page: ${page satisfies never}`);
  }
};

export const App = () => {
  const [postId, setPostId] = useState('');
  const [users, setUsers] = useState({});
  const page = usePage();
  const initData = useDevvitListener('INIT_RESPONSE');
  console.log('initdata', initData);

  useEffect(() => {
    sendToDevvit({ type: 'INIT' });
  }, []);

  useEffect(() => {
    if (initData) {
      setPostId(initData.postId);
      setUsers(initData.users);
    }
  }, [initData, setPostId]);

  return <div className="h-full">{getPage(page, { postId, users })}</div>;
};
