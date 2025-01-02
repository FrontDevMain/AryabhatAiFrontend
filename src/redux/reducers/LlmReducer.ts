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
  selectedLlm: Llm & { models: any[] };
  error: string | null;
}

const initialState: UserState = {
  loading: false,
  LLM: [] as Llm[],
  selectedLlm: {} as any,
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
      var arr: any = [];

      action.payload.map((item: any) => {
        if (!arr.some((id: any) => id?.provider_id == item.provider_id)) {
          arr.push({
            provider_id: item.provider_id,
            provider_name: item.provider_name,
            model: [
              {
                model_id: item.model_id,
                model_name: item.model_name,
                isSelected: true,
              },
            ],
            apikey: item.apikey,
            api_proxy_address: item.api_proxy_address,
            is_enabled: item.is_enabled,
          });
        } else {
          const data = arr.map((row: any) => {
            if (row.provider_id == item.provider_id) {
              return {
                provider_id: row.provider_id,
                provider_name: row.provider_name,
                model: [
                  ...row.model,
                  {
                    model_id: item.model_id,
                    model_name: item.model_name,
                    isSelected: false,
                  },
                ],
                apikey: row.apikey,
                api_proxy_address: row.api_proxy_address,
                is_enabled: row.is_enabled,
              };
            } else {
              return row;
            }
          });
          arr = data;
        }
      });

      return {
        ...state,
        loading: false,
        LLM: arr,
        selectedLlm: arr[0],
        error: null,
      };
    case FETCH_LLM_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_SELECTED_LLM:
      return { ...state, selectedLlm: action.payload };
    default:
      return state;
  }
};

export default llmReducer;
