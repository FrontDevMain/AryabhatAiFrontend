import {
  FETCH_NOTEBOOK_LIST_REQUEST,
  FETCH_NOTEBOOK_LIST_SUCCESS,
  FETCH_NOTEBOOK_LIST_FAILURE,
  NotebookList,
} from "./NotebookActionTypes";
import fetcher from "src/api/fetcher";
import { END_POINTS } from "src/api/EndPoints";

// Action creators
const fetchNotebookListRequest = () => ({
  type: FETCH_NOTEBOOK_LIST_REQUEST,
});

export const fetchNotebookListSuccess = (notebook: NotebookList[]) => ({
  type: FETCH_NOTEBOOK_LIST_SUCCESS,
  payload: notebook,
});

const fetchNotebookListFailure = () => ({
  type: FETCH_NOTEBOOK_LIST_FAILURE,
});

// Thunk action
export const fetchNotebookList = (userId: string): any => {
  return async (dispatch: any) => {
    dispatch(fetchNotebookListRequest());
    try {
      let body = {
        user_id: userId,
        type: "none",
      };
      const Response = await fetcher.post(
        END_POINTS.USER.QUERY.LIST_NOTEBOOK,
        body
      );
      dispatch(fetchNotebookListSuccess(Response.data.chat_list));
    } catch (error) {
      dispatch(fetchNotebookListFailure());
    }
  };
};
