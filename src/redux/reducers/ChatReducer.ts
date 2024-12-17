import {
  FETCH_CHAT_REQUEST,
  FETCH_CHAT_SUCCESS,
  FETCH_CHAT_FAILURE,
  Chat,
} from "../actions/chat/ChatActionTypes";

interface UserState {
  loading: boolean;
  CHAT: Chat;
  error: string | null;
}

const initialState: UserState = {
  loading: false,
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
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default chatReducer;
