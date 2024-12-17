import {
  FETCH_CHAT_REQUEST,
  FETCH_CHAT_SUCCESS,
  FETCH_CHAT_FAILURE,
  Chat,
} from "./ChatActionTypes";
import fetcher from "src/api/fetcher";
import { END_POINTS } from "src/api/EndPoints";

// Action creators
const fetchChatRequest = () => ({
  type: FETCH_CHAT_REQUEST,
});

export const fetchChatSuccess = (Llm: Chat[]) => ({
  type: FETCH_CHAT_SUCCESS,
  payload: Llm,
});

const fetchChatFailure = () => ({
  type: FETCH_CHAT_FAILURE,
});

// Thunk action
export const fetchChat = (userId: string, chatId: string): any => {
  return async (dispatch: any) => {
    dispatch(fetchChatRequest());
    try {
      let body = {
        user_id: userId,
        chat_id: chatId,
      };
      const Response = await fetcher.post(
        END_POINTS.USER.QUERY.SHOW_HISTORY,
        body
      );
      dispatch(fetchChatSuccess(JSON.parse(Response.data.chat_list)));
      return Response.data;
    } catch (error) {
      dispatch(fetchChatFailure());
    }
  };
};
