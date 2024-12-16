import {
  FETCH_LICENSE_REQUEST,
  FETCH_LICENSE_SUCCESS,
  FETCH_LICENSE_FAILURE,
  License,
} from "../actions/license/LicenseActionTypes";

interface UserState {
  loading: boolean;
  license: License;
  error: string | null;
}

const initialState: UserState = {
  loading: false,
  license: {} as License,
  error: null,
};

const licenseReducer = (
  state = initialState,
  action: {
    type: string;
    payload: License | any;
  }
): UserState => {
  switch (action.type) {
    case FETCH_LICENSE_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_LICENSE_SUCCESS:
      return { ...state, loading: false, license: action.payload, error: null };
    case FETCH_LICENSE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default licenseReducer;
