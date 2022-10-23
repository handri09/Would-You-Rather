import { GET_USERS, SET_USERANSWER, SET_USER_QUESTION } from '../actions/users';

// Reducer
export default function users(state = {}, action) {
  switch(action.type) {
    case GET_USERS:
      const { users } = action;
      return {
        ...state,
        ...users
      };
    case SET_USERANSWER:
      const { authedUser, qid } = action;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: action.answer
          }
        }
      };
      
    case SET_USER_QUESTION:
      const { question } = action;
      return {
        ...state,
        [question.author]: {
          ...state[question.author],
          questions: state[question.author].questions.concat([question.id])
        }
      };
    default:
      return state;
  }
}