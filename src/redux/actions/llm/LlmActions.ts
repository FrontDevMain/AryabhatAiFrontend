import {
  FETCH_LLM_REQUEST,
  FETCH_LLM_SUCCESS,
  FETCH_LLM_FAILURE,
  UPDATE_SELECTED_LLM,
  Llm,
} from "./LlmActionTypes";
import fetcher from "src/api/fetcher";
import { END_POINTS } from "src/api/EndPoints";

// Action creators
const fetchLlmRequest = () => ({
  type: FETCH_LLM_REQUEST,
});

export const fetchLlmSuccess = (Llm: Llm[]) => ({
  type: FETCH_LLM_SUCCESS,
  payload: Llm,
});

const fetchLlmFailure = () => ({
  type: FETCH_LLM_FAILURE,
});

export const updateSelectedLlm = (Llm: Llm) => ({
  type: UPDATE_SELECTED_LLM,
  payload: Llm,
});

// Thunk action
export const fetchLlm = (): any => {
  return async (dispatch: any) => {
    dispatch(fetchLlmRequest());
    try {
      const Response = await fetcher.get(END_POINTS.ADMIN.LLM.GET_LLM_DETAILS);
      dispatch(fetchLlmSuccess(Response.data));
      return Response.data;
    } catch (error) {
      dispatch(fetchLlmFailure());
    }
  };
};
