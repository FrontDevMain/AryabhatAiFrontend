import {
  FETCH_NOTEBOOK_LIST_REQUEST,
  FETCH_NOTEBOOK_LIST_SUCCESS,
  FETCH_NOTEBOOK_LIST_FAILURE,
  NotebookList,
  TOGGLE_NOTEBOOK_PIN_REQUEST,
  TOGGLE_NOTEBOOK_PIN_FAILURE,
  TOGGLE_NOTEBOOK_PIN_SUCCESS,
  TOGGLE_NOTEBOOK_ARCHIVE_REQUEST,
  TOGGLE_NOTEBOOK_ARCHIVE_SUCCESS,
  TOGGLE_NOTEBOOK_ARCHIVE_FAILURE,
  NOTEBOOK_DELETE_REQUEST,
  NOTEBOOK_DELETE_SUCCESS,
  NOTEBOOK_DELETE_FAILURE,
  NOTEBOOK_CHANGE_HEADERNAME_REQUEST,
  NOTEBOOK_CHANGE_HEADERNAME_SUCCESS,
  NOTEBOOK_CHANGE_HEADERNAME_FAILURE,
} from "../actions/Notebook/NotebookActionTypes";

interface UserState {
  loading: boolean;
  updateLoading: boolean;
  notebookList: NotebookList[];
  error: string | null;
}

const initialState: UserState = {
  loading: false,
  updateLoading: false,
  notebookList: [] as NotebookList[],
  error: null,
};

const licenseReducer = (
  state = initialState,
  action: {
    type: string;
    payload: NotebookList[] | any;
  }
): UserState => {
  switch (action.type) {
    case FETCH_NOTEBOOK_LIST_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_NOTEBOOK_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        notebookList: action.payload,
        error: null,
      };
    case FETCH_NOTEBOOK_LIST_FAILURE:
      return { ...state, loading: false };
    case TOGGLE_NOTEBOOK_PIN_REQUEST:
      return { ...state, updateLoading: true };
    case TOGGLE_NOTEBOOK_PIN_SUCCESS:
      return {
        ...state,
        notebookList: state.notebookList.map((item) =>
          item.chat_id == action.payload
            ? { ...item, is_pin: item.is_pin == 1 ? 0 : 1 }
            : { ...item }
        ),
        updateLoading: false,
      };
    case TOGGLE_NOTEBOOK_PIN_FAILURE:
      return { ...state, updateLoading: false };
    case TOGGLE_NOTEBOOK_ARCHIVE_REQUEST:
      return { ...state, updateLoading: true };
    case TOGGLE_NOTEBOOK_ARCHIVE_SUCCESS:
      return {
        ...state,
        notebookList: state.notebookList.map((item) =>
          item.chat_id == action.payload
            ? { ...item, is_archieved: item.is_archieved == 1 ? 0 : 1 }
            : { ...item }
        ),
        updateLoading: false,
      };
    case TOGGLE_NOTEBOOK_ARCHIVE_FAILURE:
      return { ...state, updateLoading: false };
    case NOTEBOOK_DELETE_REQUEST:
      return { ...state, updateLoading: true };
    case NOTEBOOK_DELETE_SUCCESS:
      return {
        ...state,
        notebookList: state.notebookList.filter(
          (item) => item.chat_id !== action.payload
        ),
        updateLoading: false,
      };
    case NOTEBOOK_DELETE_FAILURE:
      return { ...state, updateLoading: false };
      return { ...state, updateLoading: false };
    case NOTEBOOK_CHANGE_HEADERNAME_REQUEST:
      return { ...state, updateLoading: true };
    case NOTEBOOK_CHANGE_HEADERNAME_SUCCESS:
      return {
        ...state,
        notebookList: state.notebookList.map((item) =>
          item.chat_id == action.payload.chatid
            ? { ...item, chat_header: action.payload.headerName }
            : { ...item }
        ),
        updateLoading: false,
      };
    case NOTEBOOK_CHANGE_HEADERNAME_FAILURE:
      return { ...state, updateLoading: false };
    default:
      return state;
  }
};

export default licenseReducer;
