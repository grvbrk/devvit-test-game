import { Devvit, useAsync, useChannel, useState } from '@devvit/public-api';
import { sendMessageToWebview } from './utils/utils.js';
import { WebviewToBlockMessage } from '../game/shared.js';
import { WEBVIEW_ID } from './constants.js';
import { Preview } from './components/Preview.js';
import { channel } from 'diagnostics_channel';

// Devvit.addSettings([
//   // Just here as an example
//   {
//     name: DEVVIT_SETTINGS_KEYS.SECRET_API_KEY,
//     label: 'API Key for secret things',
//     type: 'string',
//     isSecret: true,
//     scope: 'app',
//   },
// ]);

Devvit.configure({
  redditAPI: true,
  http: true,
  redis: true,
  realtime: true,
});

type RealTimePlayerUpdates = {
  sessionId: string;
  userId: string;
  name: string;
  lastSeen: number;
};

// type UserRecord = {
//   id: string;
//   session: string;
//   name: string;
// };

function generateId(): string {
  let id = '';
  const asciiZero = '0'.charCodeAt(0);
  for (let i = 0; i < 4; i++) {
    id += String.fromCharCode(Math.floor(Math.random() * 26) + asciiZero);
  }
  return id;
}

Devvit.addMenuItem({
  label: 'test game 3 post',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    const subreddit = await reddit.getCurrentSubreddit();
    const post = await reddit.submitPost({
      title: 'test game 3 post title',
      subredditName: subreddit.name,
      preview: <Preview />,
    });
    ui.showToast({ text: 'Post created!' });
    ui.navigateTo(post.url);
  },
});

Devvit.addCustomPostType({
  name: 'Experience Post',
  height: 'tall',
  render: (context) => {
    const currentSession = generateId();
    const [launched, setLaunched] = useState(false);
    const { data: currentUser } = useAsync(async () => {
      if (!context.userId) return null;
      const user = await context.reddit.getCurrentUser();
      if (!user) return null;
      return { userId: user.id, username: user.username };
    });

    const { data: userList, loading } = useAsync(async () => {
      if (!context.userId) return {};
      const user = await context.reddit.getCurrentUser();
      if (user) {
        channel.send({
          userId: user.id,
          name: user.username,
          lastSeen: Date.now(),
          sessionId: currentSession,
        });
        return { [user.id]: { session: generateId(), name: user.username, lastSeen: Date.now() } };
      }

      return {};
    });

    console.log('USERLIST', userList);

    const channel = useChannel<RealTimePlayerUpdates>({
      name: 'events',
      onMessage: ({ sessionId, userId, name, lastSeen }) => {
        if (sessionId == currentSession || userId == currentUser?.userId) {
          return;
        }
        if (userList && !(userId in userList)) {
          userList[userId] = {
            name,
            lastSeen,
            session: sessionId,
          };
        }
      },
      onSubscribed: async () => {
        // await updateUserList();
      },
      onUnsubscribed: () => {
        // handle network degradation with fallback scenarios
      },
    });

    channel.subscribe();

    return (
      <vstack height="100%" width="100%" alignment="center middle">
        {launched ? (
          <webview
            id={WEBVIEW_ID}
            url="index.html"
            width={'100%'}
            height={'100%'}
            onMessage={async (event) => {
              const data = event as unknown as WebviewToBlockMessage;

              switch (data.type) {
                case 'INIT':
                  // const activeUsers = await context.redis.zRange('active_users', 0, -1);

                  sendMessageToWebview(context, {
                    type: 'INIT_RESPONSE',
                    payload: {
                      postId: context.postId!,
                      users: userList,
                    },
                  });
                  break;
                case 'USER_OFFLINE':
                  const userId = context.userId;
                  if (!userId || !userList) return;
                  // if (userId) {
                  //   await context.redis.zRem('active_users', userId); // Remove user from active list
                  // }

                  if (userId in userList) delete userList[userId];
                  break;

                default:
                  console.error('Unknown message type', data);
                  break;
              }
            }}
          />
        ) : (
          <button
            onPress={() => {
              setLaunched(true);
            }}
          >
            Launch Game
          </button>
        )}
      </vstack>
    );
  },
});

export default Devvit;
