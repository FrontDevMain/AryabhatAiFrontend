export const FETCH_LLM_REQUEST = "FETCH_LLM_REQUEST";
export const FETCH_LLM_SUCCESS = "FETCH_LLM_SUCCESS";
export const FETCH_LLM_FAILURE = "FETCH_LLM_FAILURE";

export const UPDATE_SELECTED_LLM = "UPDATE_SELECTED_LLM";

// User model
export interface Llm {
  provider_id: string;
  provider_name: string;
  model_id: string;
  model_name: string;
  user_id: string;
  apikey: string;
  api_proxy_address: string;
  is_enabled: boolean;
  created_at: string;
}
