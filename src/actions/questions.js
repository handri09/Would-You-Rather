export const GET_QUESTIONS = 'GET_QUESTIONS';
export const SET_QUESTANSWER = 'SET_QUESTANSWER';
export const SET_QUESTION = 'SET_QUESTION'

export function getQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    questions
  };
}

export function setQuestionAnswer (info) {
  const { authedUser, qid, answer } = info
  return {
    type: SET_QUESTANSWER,
    authedUser, 
    qid,
    answer
  }
}

export function addQuestion (question){
  return {
    type: SET_QUESTION,
    question
  }
}