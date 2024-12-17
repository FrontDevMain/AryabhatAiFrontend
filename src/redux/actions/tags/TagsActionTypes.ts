export const FETCH_TAGS_REQUEST = "FETCH_TAGS_REQUEST";
export const FETCH_TAGS_SUCCESS = "FETCH_TAGS_SUCCESS";
export const FETCH_TAGS_FAILURE = "FETCH_TAGS_FAILURE";
export const UPDATE_TAG_LIST = "UPDATE_TAG_LIST";
export const UPDATE_SELECTED_TAG = "UPDATE_SELECTED_TAG";

export type tagType = {
  _id: string;
  tag_name: string;
  user_id: string;
  username: string;
  created_at: string;
  modified_at: string | null;
  modified_by: string | null;
  modified_by_username: string | null;
};

// User model
export interface tag {
  total_tags: number;
  total_pages: number;
  tags: tagType[];
}
