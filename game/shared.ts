export type Page =
  | "home"
  | "pokemon";

export type WebviewToBlockMessage = { type: "INIT" } | {
  type: "GET_POKEMON_REQUEST";
  payload: { name: string };
} | {
  type: "GAME_CONFIG_REQUEST"
  payload: any
}

export type BlocksToWebviewMessage = {
  type: "INIT_RESPONSE";
  payload: {
    postId: string;
  };
} | {
  type: "GET_POKEMON_RESPONSE";
  payload: { number: number; name: string; error?: string };
} | {
  type: "GAME_CONFIG_RESPONSE"
  payload: any
}

export type DevvitMessage = {
  type: "devvit-message";
  data: { message: BlocksToWebviewMessage };
};
