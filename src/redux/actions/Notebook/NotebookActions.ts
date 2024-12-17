import {
  FETCH_NOTEBOOK_LIST_REQUEST,
  FETCH_NOTEBOOK_LIST_SUCCESS,
  FETCH_NOTEBOOK_LIST_FAILURE,
  NotebookList,
  TOGGLE_NOTEBOOK_PIN_REQUEST,
  TOGGLE_NOTEBOOK_PIN_SUCCESS,
  TOGGLE_NOTEBOOK_PIN_FAILURE,
  TOGGLE_NOTEBOOK_ARCHIVE_REQUEST,
  TOGGLE_NOTEBOOK_ARCHIVE_SUCCESS,
  TOGGLE_NOTEBOOK_ARCHIVE_FAILURE,
  NOTEBOOK_DELETE_REQUEST,
  NOTEBOOK_DELETE_SUCCESS,
  NOTEBOOK_DELETE_FAILURE,
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

// action craetors
const toggleNotebookPinRequest = () => ({
  type: TOGGLE_NOTEBOOK_PIN_REQUEST,
});

const toggleNotebookPinSuccess = (chatid: string) => ({
  type: TOGGLE_NOTEBOOK_PIN_SUCCESS,
  payload: chatid,
});

const toggleNotebookPinfailure = () => ({
  type: TOGGLE_NOTEBOOK_PIN_FAILURE,
});

export const toggleNotebookPin = (userId: string, chatId: string): any => {
  return async (dispatch: any) => {
    dispatch(toggleNotebookPinRequest());
    try {
      let body = {
        user_id: userId,
        chat_id: chatId,
      };
      const Response = await fetcher.put(
        END_POINTS.USER.QUERY.PIN_NOTEBOOK,
        body
      );
      if (Response.status == 200) {
        dispatch(toggleNotebookPinSuccess(chatId));
      }
    } catch (error) {
      dispatch(toggleNotebookPinfailure());
    }
  };
};

// action craetors
const toggleNotebookArchiveRequest = () => ({
  type: TOGGLE_NOTEBOOK_ARCHIVE_REQUEST,
});

const toggleNotebookArchiveSuccess = (chatid: string) => ({
  type: TOGGLE_NOTEBOOK_ARCHIVE_SUCCESS,
  payload: chatid,
});

const toggleNotebookArchivefailure = () => ({
  type: TOGGLE_NOTEBOOK_ARCHIVE_FAILURE,
});

export const toggleNotebookArchive = (userId: string, chatId: string): any => {
  return async (dispatch: any) => {
    dispatch(toggleNotebookArchiveRequest());
    try {
      let body = {
        user_id: userId,
        chat_id: chatId,
      };
      const Response = await fetcher.put(
        END_POINTS.USER.QUERY.ARCHIVE_NOTEBOOK,
        body
      );
      if (Response.status == 200) {
        dispatch(toggleNotebookArchiveSuccess(chatId));
      }
    } catch (error) {
      dispatch(toggleNotebookArchivefailure());
    }
  };
};

// action craetors
const notebookDeleteRequest = () => ({
  type: NOTEBOOK_DELETE_REQUEST,
});

const notebookDeleteSuccess = (chatid: string) => ({
  type: NOTEBOOK_DELETE_SUCCESS,
  payload: chatid,
});

const notebookDeletefailure = () => ({
  type: NOTEBOOK_DELETE_FAILURE,
});

export const onNotebookDelete = (chatId: string): any => {
  return async (dispatch: any) => {
    dispatch(notebookDeleteRequest());
    try {
      const Response = await fetcher.delete(
        END_POINTS.USER.QUERY.DELETE_NOTEBOOK(chatId)
      );
      if (Response.status == 200) {
        dispatch(notebookDeleteSuccess(chatId));
      }
    } catch (error) {
      dispatch(notebookDeletefailure());
    }
  };
};
