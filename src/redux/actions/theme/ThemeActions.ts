import { ThunkAction } from "redux-thunk";
import {
  FETCH_THEME_REQUEST,
  FETCH_THEME_SUCCESS,
  FETCH_THEME_FAILURE,
  Theme,
} from "./ThemeActionTypes";
import fetcher from "src/api/fetcher";
import { END_POINTS } from "src/api/EndPoints";

// Action creators
const fetchThemeRequest = () => ({
  type: FETCH_THEME_REQUEST,
});

export const fetchThemeSuccess = (theme: Theme) => ({
  type: FETCH_THEME_SUCCESS,
  payload: theme,
});

const fetchThemeFailure = () => ({
  type: FETCH_THEME_FAILURE,
});

// Thunk action
export const fetchTheme = (body: any): any => {
  return async (dispatch: any) => {
    dispatch(fetchThemeRequest());
    try {
      const Response = await fetcher.post(
        END_POINTS.ADMIN.SETTINGS.GET_CONFIG,
        body
      );
      Response.data.length && dispatch(fetchThemeSuccess(Response.data[0]));
    } catch (error) {
      dispatch(fetchThemeFailure());
    }
  };
};
