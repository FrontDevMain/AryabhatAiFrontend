export const FETCH_NOTEBOOK_LIST_REQUEST = "FETCH_NOTEBOOK_LIST_REQUEST";
export const FETCH_NOTEBOOK_LIST_SUCCESS = "FETCH_NOTEBOOK_LIST_SUCCESS";
export const FETCH_NOTEBOOK_LIST_FAILURE = "FETCH_NOTEBOOK_LIST_FAILURE";

// User model
export interface NotebookList {
  user_id: string;
  chat_id: string;
  is_archieved: number;
  is_pin: number;
  chat_header: string;
  timestamp: string;
}
