import {
  FETCH_CHAT_REQUEST,
  FETCH_CHAT_SUCCESS,
  FETCH_CHAT_FAILURE,
  Chat,
  FETCH_QUERY_REQUEST,
  FETCH_QUERY_SUCCESS,
  FETCH_QUERY_FAILURE,
} from "../actions/chat/ChatActionTypes";

interface UserState {
  loading: boolean;
  queryLoading: boolean;
  CHAT: Chat;
  error: string | null;
}

const initialState: UserState = {
  loading: false,
  queryLoading: false,
  CHAT: {
    user_id: "",
    messages: [],
    chat_id: "",
  } as Chat,
  error: null,
};

const chatReducer = (
  state = initialState,
  action: {
    type: string;
    payload: Chat | any;
  }
): UserState => {
  switch (action.type) {
    case FETCH_CHAT_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        CHAT: action.payload,
        error: null,
      };
    case FETCH_CHAT_FAILURE:
      return { ...state, loading: false };
    case FETCH_QUERY_REQUEST:
      return { ...state, queryLoading: true, error: null };
    case FETCH_QUERY_SUCCESS:
      return { ...state, queryLoading: false, error: null };
    case FETCH_QUERY_FAILURE:
      return { ...state, queryLoading: false };
    default:
      return state;
  }
};

export default chatReducer;
