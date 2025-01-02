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
import dayjs from "dayjs";

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

export const updateSelectedTag = (tag: tagType | any) => ({
  type: UPDATE_SELECTED_TAG,
  payload: tag,
});

// Thunk action
export const fetchTags = (
  page: number,
  page_size: number,
  filterValue: any
): any => {
  console.log();
  return async (dispatch: any) => {
    dispatch(fetchTagsRequest());
    try {
      const Response = await fetcher.get(
        END_POINTS.ADMIN.TAGS.GET_TAGS(
          page,
          page_size,
          Object.entries(filterValue)
            .filter((item) => item[1])
            .map(
              (item) =>
                `&${item[0]}=${
                  item[0] == "created_date"
                    ? dayjs(item[1] as Date).format("DD-MM-YYYY")
                    : item[1]
                }`
            )
            .join("")
        )
      );
      dispatch(fetchTagsSuccess(Response.data));
    } catch (error) {
      dispatch(fetchTagsFailure());
    }
  };
};
