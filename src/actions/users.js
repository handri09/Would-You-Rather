export const GET_USERS = 'GET_USERS';
export const SET_USERANSWER = 'SET_USERANSWER';
export const SET_USER_QUESTION = 'SET_USER_QUESTION';

// Action Creator
export function getUsers(users) {
  return {
    type: GET_USERS,
    users,
  };
}

export function setUserAnswer ({ authedUser, qid, answer }) {
  return {
    type: SET_USERANSWER,
    authedUser,
    qid,
    answer,
  }
}

export function userQuestion (question) {
  return {
    type: SET_USER_QUESTION,
    question
  };
}