import {
  FETCH_CHAT_REQUEST,
  FETCH_CHAT_SUCCESS,
  FETCH_CHAT_FAILURE,
  Chat,
  FETCH_QUERY_REQUEST,
  FETCH_QUERY_SUCCESS,
  FETCH_QUERY_FAILURE,
} from "./ChatActionTypes";
import fetcher from "src/api/fetcher";
import { END_POINTS } from "src/api/EndPoints";

// Action creators
const fetchChatRequest = () => ({
  type: FETCH_CHAT_REQUEST,
});

export const fetchChatSuccess = (Chat: Chat) => ({
  type: FETCH_CHAT_SUCCESS,
  payload: Chat,
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
    } catch (error) {
      dispatch(fetchChatFailure());
    }
  };
};

// Action creators
const fetchQueryRequest = () => ({
  type: FETCH_QUERY_REQUEST,
});

export const fetchQuerySuccess = () => ({
  type: FETCH_QUERY_SUCCESS,
});

const fetchQueryFailure = () => ({
  type: FETCH_QUERY_FAILURE,
});

// Thunk action
export const fetchQuery = (data: any): any => {
  return async (dispatch: any) => {
    dispatch(fetchQueryRequest());
    try {
      let body = { ...data };
      const Response = await fetcher.post(
        END_POINTS.USER.QUERY.QUERY_NOTEBOOK,
        body
      );
      if (Response.data.status == "success") {
        await dispatch(fetchChat(data.user_id, data.chat_id));
        dispatch(fetchQuerySuccess());
      }
    } catch (error) {
      dispatch(fetchQueryFailure());
    }
  };
};
