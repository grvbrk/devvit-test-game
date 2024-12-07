import { Devvit, useAsync, useChannel, useState } from '@devvit/public-api';
import { DEVVIT_SETTINGS_KEYS } from './constants.js';
import { sendMessageToWebview } from './utils/utils.js';
import { WebviewToBlockMessage } from '../game/shared.js';
import { WEBVIEW_ID } from './constants.js';
import { Preview } from './components/Preview.js';
import { getPokemonByName } from './core/pokeapi.js';

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

type RealtimeMessage = {
  user: string;
  data: any;
};

Devvit.configure({
  redditAPI: true,
  http: true,
  redis: true,
  realtime: true,
});

Devvit.addMenuItem({
  // Please update as you work on your idea!
  label: 'test game 3 post',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    const subreddit = await reddit.getCurrentSubreddit();
    const post = await reddit.submitPost({
      // Title of the post. You'll want to update!
      title: 'test game 3 post title',
      subredditName: subreddit.name,
      preview: <Preview />,
    });
    ui.showToast({ text: 'Post created!' });
    ui.navigateTo(post.url);
  },
});

// Add a post type definition
Devvit.addCustomPostType({
  name: 'Experience Post',
  height: 'tall',
  render: (context) => {
    const [launched, setLaunched] = useState(false);

    const channel = useChannel<RealtimeMessage>({
      name: 'events',
      onMessage: (data) => {
        // modify local state
      },
      onSubscribed: () => {
        // handle connection setup
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
              console.log('Received message', event);
              const data = event as unknown as WebviewToBlockMessage;

              switch (data.type) {
                case 'INIT':
                  sendMessageToWebview(context, {
                    type: 'INIT_RESPONSE',
                    payload: {
                      postId: context.postId!,
                    },
                  });
                  break;
                case 'GET_POKEMON_REQUEST':
                  context.ui.showToast({ text: `Received message: ${JSON.stringify(data)}` });
                  const pokemon = await getPokemonByName(data.payload.name);

                  sendMessageToWebview(context, {
                    type: 'GET_POKEMON_RESPONSE',
                    payload: {
                      name: pokemon.name,
                      number: pokemon.id,
                      // Note that we don't allow outside images on Reddit if
                      // wanted to get the sprite. Please reach out to support
                      // if you need this for your app!
                    },
                  });
                  break;
                case 'GAME_CONFIG_REQUEST':
                  sendMessageToWebview(context, {
                    type: 'GAME_CONFIG_RESPONSE',
                    payload: {
                      data,
                    },
                  });
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
