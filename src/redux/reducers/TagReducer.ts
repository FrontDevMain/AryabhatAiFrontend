import {
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE,
  tag,
  UPDATE_TAG_LIST,
  tagType,
  UPDATE_SELECTED_TAG,
} from "../actions/tags/TagsActionTypes";

interface UserState {
  loading: boolean;
  TAG: tag;
  selectedTag: tagType;
  error: string | null;
}

const initialState: UserState = {
  loading: false,
  TAG: {} as tag,
  selectedTag: {} as tagType,
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
        selectedTag: action.payload.tags[0],
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
    case UPDATE_SELECTED_TAG:
      return { ...state, selectedTag: action.payload };
    default:
      return state;
  }
};

export default tagReducer;
