import {
  FETCH_LLM_REQUEST,
  FETCH_LLM_SUCCESS,
  FETCH_LLM_FAILURE,
  Llm,
  UPDATE_SELECTED_LLM,
} from "../actions/llm/LlmActionTypes";

interface UserState {
  loading: boolean;
  LLM: Llm[];
  selectedLlm: Llm;
  error: string | null;
}

const initialState: UserState = {
  loading: false,
  LLM: [] as Llm[],
  selectedLlm: {} as Llm,
  error: null,
};

const llmReducer = (
  state = initialState,
  action: {
    type: string;
    payload: Llm | any;
  }
): UserState => {
  switch (action.type) {
    case FETCH_LLM_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_LLM_SUCCESS:
      return {
        ...state,
        loading: false,
        LLM: action.payload,
        selectedLlm: action.payload[0],
        error: null,
      };
    case FETCH_LLM_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_SELECTED_LLM:
      console.log(action.payload);
      return { ...state, selectedLlm: action.payload };
    default:
      return state;
  }
};

export default llmReducer;
