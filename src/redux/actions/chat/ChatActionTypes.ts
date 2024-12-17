export const FETCH_CHAT_REQUEST = "FETCH_CHAT_REQUEST";
export const FETCH_CHAT_SUCCESS = "FETCH_CHAT_SUCCESS";
export const FETCH_CHAT_FAILURE = "FETCH_CHAT_FAILURE";

export type messageType = {
  context: [string] | string;
  is_Liked: number;
  message_id: string;
  type: string;
};

// User model
export interface Chat {
  chat_id: string;
  user_id: string;
  messages: messageType[];
}
