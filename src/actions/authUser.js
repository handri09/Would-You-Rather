export const SET_AUTHUSER = 'SET_AUTHUSER';
export const RESET_AUTHUSER = 'RESET_AUTHUSER';

// Action Creator
export function setAuthedUserAction(id) {
  return {
    type: SET_AUTHUSER,
    id,
  };
}

export function resetAuthedUserAction() {
  return {
    type: RESET_AUTHUSER,
  };
}