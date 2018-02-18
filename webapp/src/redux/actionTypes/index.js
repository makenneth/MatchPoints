import keymirror from 'keymirror';

const actionTypes = keymirror({
  LOAD_AUTH_REQUEST: null,
  LOAD_AUTH_SUCCESS: null,
  LOAD_AUTH_FAILURE: null,
  LOG_IN_REQUEST: null,
  LOG_IN_SUCCESS: null,
  LOG_IN_FAILURE: null,
  SIGN_UP_REQUEST: null,
  SIGN_UP_SUCCESS: null,
  SIGN_UP_FAILURE: null,
  LOG_OUT_REQUEST: null,
  LOG_OUT_SUCCESS: null,
  LOG_OUT_FAILURE: null,
  ACTIVATE_CLUB_REQUEST: null,
  ACTIVATE_CLUB_SUCCESS: null,
  ACTIVATE_CLUB_FAILURE: null,
  CLEAR_ERROR: null,

  RESEND_EMAIL_REQUEST: null,
  RESEND_EMAIL_SUCCESS: null,
  RESEND_EMAIL_FAILURE: null,

  FETCH_CURRENT_PLAYERS_REQUEST: null,
  FETCH_CURRENT_PLAYERS_SUCCESS: null,
  FETCH_CURRENT_PLAYERS_FAILURE: null,

  FETCH_PROMOTED_PLAYERS_REQUEST: null,
  FETCH_PROMOTED_PLAYERS_SUCCESS: null,
  FETCH_PROMOTED_PLAYERS_FAILURE: null,

  ADD_PLAYER_REQUEST: null,
  UPDATE_PLAYER_REQUEST: null,
  DELETE_PLAYER_REQUEST: null,
  ADD_PLAYER_SUCCESS: null,
  UPDATE_PLAYER_SUCCESS: null,
  DELETE_PLAYER_SUCCESS: null,
  ADD_PLAYER_FAILURE: null,
  UPDATE_PLAYER_FAILURE: null,
  DELETE_PLAYER_FAILURE: null,

  OPEN_EDIT_MODAL: null,
  OPEN_NEW_MODAL: null,
  CLOSE_EDIT_MODAL: null,
  CLOSE_NEW_MODAL: null,

  SET_MIN_AND_MAX: null,
  SET_DATE: null,
  RESTORE_SESSION: null,
  REGISTER_PLAYER: null,
  UNREGISTER_PLAYER: null,
  ADD_PLAYERS_REQUEST: null,
  ADD_PLAYERS_SUCCESS: null,
  ADD_PLAYERS_FAILURE: null,
  CREATE_SESSION_REQUEST: null,
  CREATE_SESSION_SUCCESS: null,
  CREATE_SESSION_FAILURE: null,

  OPEN_UPLOAD_DIALOG: null,
  CLOSE_UPLOAD_DIALOG: null,
  START_PROCESS_DATA: null,
  END_PROCESS_DATA: null,

  OPEN_NAV: null,
  CLOSE_NAV: null,
  SET_TAB: null,
  PRE_SET_TAB: null,
  SET_PAGE: null,
  OPEN_LOGIN: null,

  CHANGE_SCHEMA: null,
  MOVE_PLAYER_UP: null,
  MOVE_PLAYER_DOWN: null,
  FOUND_SCHEMATA: null,

  DELETE_SESSION_REQUEST: null,
  DELETE_SESSION_SUCCESS: null,
  DELETE_SESSION_FAILURE: null,
  UPDATE_SESSION_REQUEST: null,
  UPDATE_SESSION_SUCCESS: null,
  UPDATE_SESSION_FAILURE: null,
  LOAD_SESSIONS_REQUEST: null,
  LOAD_SESSIONS_FAILURE: null,
  LOAD_SESSIONS_SUCCESS: null,
  POST_SESSION_REQUEST: null,
  POST_SESSION_SUCCESS: null,
  POST_SESSION_FAILURE: null,

  FETCH_SESSION_REQUEST: null,
  FETCH_SESSION_SUCCESS: null,
  FETCH_SESSION_FAILURE: null,
  SELECT_SESSION: null,
  UPDATE_SCORE: null,
  UPDATE_RESULT: null,

  DETERMINE_SESSION_EDIT_STATUS_REQUEST: null,
  DETERMINE_SESSION_EDIT_STATUS_SUCCESS: null,
  DETERMINE_SESSION_EDIT_STATUS_FAILURE: null,

  FETCH_ALL_CLUBS_REQUEST: null,
  FETCH_ALL_CLUBS_SUCCESS: null,
  FETCH_ALL_CLUBS_FAILURE: null,
  SET_QUERY_CLUB: null,
  SET_QUERY_DATE: null,
  FETCH_ROUNDROBIN_DETAIL_REQUEST: null,
  FETCH_ROUNDROBIN_DETAIL_SUCCESS: null,
  FETCH_ROUNDROBIN_DETAIL_FAILURE: null,

  ADDRESS_AUTO_COMPLETE_REQUEST: null,
  ADDRESS_AUTO_COMPLETE_SUCCESS: null,
  ADDRESS_AUTO_COMPLETE_FAILURE: null,

  CLEAR_PREDICTIONS: null,

  CHANGE_PASSWORD_REQUEST: null,
  CHANGE_PASSWORD_SUCCESS: null,
  CHANGE_PASSWORD_FAILURE: null,
  CHANGE_INFO_REQUEST: null,
  CHANGE_INFO_SUCCESS: null,
  CHANGE_INFO_FAILURE: null,

  SET_PASSWORD_TOKEN: null,
  RESET_PASSWORD_REQUEST_REQUEST: null,
  RESET_PASSWORD_REQUEST_SUCCESS: null,
  RESET_PASSWORD_REQUEST_FAILURE: null,
  RESET_PASSWORD_REQUEST: null,
  RESET_PASSWORD_SUCCESS: null,
  RESET_PASSWORD_FAILURE: null,

  START_EDIT_SAVED_SESSION: null,
  UPDATE_SESSION_DETAIL_REQUEST: null,
  UPDATE_SESSION_DETAIL_SUCCESS: null,
  UPDATE_SESSION_DETAIL_FAILURE: null,

  UPDATE_CLUB_HOUR_REQUEST: null,
  DELETE_CLUB_HOUR_REQUEST: null,
  ADD_CLUB_HOUR_REQUEST: null,
  UPDATE_CLUB_HOUR_SUCCESS: null,
  DELETE_CLUB_HOUR_SUCCESS: null,
  ADD_CLUB_HOUR_SUCCESS: null,
  UPDATE_CLUB_HOUR_FAILURE: null,
  DELETE_CLUB_HOUR_FAILURE: null,
  ADD_CLUB_HOUR_FAILURE: null,

  FETCH_CLUB_HOURS_REQUEST: null,
  FETCH_CLUB_HOURS_SUCCESS: null,
  FETCH_CLUB_HOURS_FAILURE: null,

  CONFIG_INIT_INFORMATION_REQUEST: null,
  CONFIG_INIT_INFORMATION_SUCCESS: null,
  CONFIG_INIT_INFORMATION_FAILURE: null,
});

export default actionTypes;
