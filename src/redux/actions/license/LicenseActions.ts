import {
  FETCH_LICENSE_REQUEST,
  FETCH_LICENSE_SUCCESS,
  FETCH_LICENSE_FAILURE,
  License,
} from "./LicenseActionTypes";
import fetcher from "src/api/fetcher";
import { END_POINTS } from "src/api/EndPoints";

// Action creators
const fetchLicenseRequest = () => ({
  type: FETCH_LICENSE_REQUEST,
});

export const fetchLicenseSuccess = (license: License) => ({
  type: FETCH_LICENSE_SUCCESS,
  payload: license,
});

const fetchLicenseFailure = () => ({
  type: FETCH_LICENSE_FAILURE,
});

// Thunk action
export const fetchLicense = (): any => {
  return async (dispatch: any) => {
    dispatch(fetchLicenseRequest());
    try {
      const Response = await fetcher.get(
        END_POINTS.ADMIN.LICENSE.CHECK_LICENSE_STATUS
      );
      dispatch(fetchLicenseSuccess(Response.data));
      return Response.data;
    } catch (error) {
      dispatch(fetchLicenseFailure());
    }
  };
};
