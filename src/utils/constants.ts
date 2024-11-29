export const PageUrls = {
  TICKET_DETAIL: "/ticket/ticket-detail/:id",
  UNAUTHORIZED: "/unauthorized",
  INDEX: "/",
  LOGIN: "/login",
  SIGN_UP: "/signup",
  USER_REGISTRATION: "/user-register",
  USER_ONBOARD: "/user-onboard",
};

export const ApiUrls = {
  LEAD_BASIC_REGISTRATION: "/leads/createlead",
  LEAD_GENRATE_OTP: "/leads/otp/generate",
  LEAD_VERIFY_OTP: "/leads/otp/verify",

  LEAD_CONSTITUTION_TYPE: "/leads/constitution-type",
  LEAD_DOC_OF_CONSTITUTION_TYPE: "/leads/constitution-type-docs",
  LEAD_REGISTER_DETAIL: "/leads/register-details",
  LEAD_UPLOAD_DOCS: "/leads/uploaddoc",
  LEAD_SAVE_BUSINESS_DETAILS: "/leads/save-business-details",
  LEAD_SAVE_BANK_DETAILS: "/leads/save-bank-details",
  LEAD_SAVE_DEPT_PARTICIPANTS: "/leads/save-dept-participants",

  LEAD_GENRATE_AADHAR_OTP: "/leads/otp-send-aadhaar",
  LEAD_VERIFY_AADHAR_OTP: "/leads/verify-aadhaar",
  LEAD_VERIFY_PAN_OTP: "/leads/verify-pan",
  VERIFY_GSTIN: "/verify-gstin",
  LEAD_SAVE_PAN_DATA: "/leads/save-pan-details",
  LEAD_UPDATE_REGISTER_STEP: "/leads/register-step-update",
  LEAD_SET_PRIMARY_ACCOUNT: "/leads/bank-primary-acc",
  VERIFY_BANK_ACC: "/verify-bank-acc",
};

export const PageRouteRegx = {
  TICKET_DETAIL: "/ticket/ticket-detail/[0-9]",
};

export const AUTHORITY = {
  USER: "USER",
  ADMIN: "ADMIN",
};

export const AUTHORITY_ROUT_MAP = [
  {
    route_regx: PageRouteRegx.TICKET_DETAIL,
    authority: [AUTHORITY.USER, AUTHORITY.ADMIN],
  },
];

export const DepartmentType = {
  operation: 1,
  finance: 2,
  it: 3,
};

export const LeadSteps = {
  kycdoc: 5,
  banking: 6,
  department: 7,
};
