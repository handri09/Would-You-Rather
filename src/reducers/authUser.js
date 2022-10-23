import { SET_AUTHUSER, RESET_AUTHUSER} from '../actions/authUser';

export default function setAuthUser(state = {}, action) {
  switch(action.type) {
    case SET_AUTHUSER:
      return action.id;
    case RESET_AUTHUSER:
      return null;
    default:
      return state;
  }
}
