import {
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE,
  tag,
  UPDATE_TAG_LIST,
} from "../actions/tags/TagsActionTypes";

interface UserState {
  loading: boolean;
  TAG: tag;
  error: string | null;
}

const initialState: UserState = {
  loading: false,
  TAG: {} as tag,
  error: null,
};

const tagReducer = (
  state = initialState,
  action: {
    type: string;
    payload: tag | any;
  }
): UserState => {
  console.log(action.payload);
  switch (action.type) {
    case FETCH_TAGS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_TAGS_SUCCESS:
      return {
        ...state,
        loading: false,
        TAG: action.payload,
        error: null,
      };
    case FETCH_TAGS_FAILURE:
      return { ...state, loading: false };
    case UPDATE_TAG_LIST:
      return {
        ...state,
        TAG: { ...state.TAG, tags: action.payload },
        loading: false,
      };
    default:
      return state;
  }
};

export default tagReducer;
