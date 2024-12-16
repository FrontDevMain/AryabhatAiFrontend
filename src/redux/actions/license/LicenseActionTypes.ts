export const FETCH_LICENSE_REQUEST = "FETCH_LICENSE_REQUEST";
export const FETCH_LICENSE_SUCCESS = "FETCH_LICENSE_SUCCESS";
export const FETCH_LICENSE_FAILURE = "FETCH_LICENSE_FAILURE";

// User model
export interface License {
  status: string;
  created_at: string;
  expiry_date: string;
  users: number;
  translation: boolean;
  database: boolean;
  storage_device: boolean;
  active_users: number;
  license_number: string;
  signed_license_key: string;
}
