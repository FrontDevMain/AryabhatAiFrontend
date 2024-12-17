import {
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE,
  tag,
  UPDATE_TAG_LIST,
  tagType,
  UPDATE_SELECTED_TAG,
} from "./TagsActionTypes";
import fetcher from "src/api/fetcher";
import { END_POINTS } from "src/api/EndPoints";

// Action creators
const fetchTagsRequest = () => ({
  type: FETCH_TAGS_REQUEST,
});

export const fetchTagsSuccess = (tagsList: tag[]) => ({
  type: FETCH_TAGS_SUCCESS,
  payload: tagsList,
});

const fetchTagsFailure = () => ({
  type: FETCH_TAGS_FAILURE,
});

export const updateTags = (tagList: tagType[]) => ({
  type: UPDATE_TAG_LIST,
  payload: tagList,
});

export const updateSelectedTag = (tag: tagType) => ({
  type: UPDATE_SELECTED_TAG,
  payload: tag,
});

// Thunk action
export const fetchTags = (
  page: number,
  page_size: number,
  created_date: string | null
): any => {
  return async (dispatch: any) => {
    dispatch(fetchTagsRequest());
    try {
      const Response = await fetcher.get(
        END_POINTS.ADMIN.TAGS.GET_TAGS(page, page_size, created_date)
      );
      dispatch(fetchTagsSuccess(Response.data));
    } catch (error) {
      dispatch(fetchTagsFailure());
    }
  };
};
