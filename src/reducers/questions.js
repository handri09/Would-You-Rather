import { GET_QUESTIONS, SET_QUESTANSWER, SET_QUESTION } from '../actions/questions'

// Reducer
export default function questions(state = {}, action) {
  switch(action.type) {
    case GET_QUESTIONS:
      const { questions } = action;
      return {
        ...state,
        ...questions,
      };
    case SET_QUESTANSWER:
      const { qid, answer, authedUser } = action;
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]:{
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUser])
          }
        }
      }
    case SET_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question
      };
    default:
      return state;
  }
}