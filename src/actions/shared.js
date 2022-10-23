import { getInitialData, saveQuestionAnswer, saveQuestion } from '../utils/API';
import { getUsers, setUserAnswer, userQuestion } from './users';
import { getQuestions, setQuestionAnswer, addQuestion } from './questions'

export function handleInitialData() {
  return dispatch => {
    getInitialData()
    .then ( ({users, questions}) => {
      dispatch(getUsers(users))
      dispatch(getQuestions(questions))
    })
  };
}

export function handleAnswer(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return saveQuestionAnswer({
      authedUser,
      qid,
      answer
    }).then ( () => {
      dispatch(setUserAnswer({ authedUser, qid, answer }));
      dispatch(setQuestionAnswer({ authedUser, qid, answer}));
    })
  }
}

export function handleSaveQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return saveQuestion({
      author: authedUser,
      optionOneText,
      optionTwoText,
    })
    .then ((question) => {
      dispatch(addQuestion(question));
      dispatch(userQuestion(question));
    })
  }
}