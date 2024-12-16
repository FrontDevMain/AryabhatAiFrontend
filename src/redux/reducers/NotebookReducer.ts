import {
  FETCH_NOTEBOOK_LIST_REQUEST,
  FETCH_NOTEBOOK_LIST_SUCCESS,
  FETCH_NOTEBOOK_LIST_FAILURE,
  NotebookList,
} from "../actions/Notebook/NotebookActionTypes";

interface UserState {
  loading: boolean;
  notebookList: NotebookList[];
  error: string | null;
}

const initialState: UserState = {
  loading: false,
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
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default licenseReducer;
