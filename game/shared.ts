export type Page =
  | "home"
  | "game";

export type WebviewToBlockMessage = { type: string } | {
  type: "GAME_CONFIG_REQUEST"
  payload: any
}

export type BlocksToWebviewMessage = {
  type: "INIT_RESPONSE";
  payload: {
    postId: string;
    users: any
  };
} | {
  type: "GAME_CONFIG_RESPONSE"
  payload: any
}

export type DevvitMessage = {
  type: "devvit-message";
  data: { message: BlocksToWebviewMessage };
};
