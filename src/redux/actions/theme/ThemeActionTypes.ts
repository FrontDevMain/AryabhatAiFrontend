export const FETCH_THEME_REQUEST = "FETCH_THEME_REQUEST";
export const FETCH_THEME_SUCCESS = "FETCH_THEME_SUCCESS";
export const FETCH_THEME_FAILURE = "FETCH_THEME_FAILURE";

// User model
export interface Theme {
  user_id: string;
  Theme_logo: null;
  Theme_theme: string;
  Theme_font_size: number;
  Theme_primary_colour: string;
  Theme_neutral_colour: string;
  Setting_archive_record: number;
  SMTP_server_address: string;
  SMTP_server_port: number;
  SMTP_server_sequrity: string;
  SMTP_email_address: string;
  SMTP_username: string;
  SMTP_password: null | any;
}
