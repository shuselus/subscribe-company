import { ERROR_MESSAGE, RECONNECT, SELECTED_COMPANY, SELECTED_USERS} from "../actions/appActions";

const initState = {
   errorMssage: null,
   reconnect: false,
   selectedCompany: null,
   selectedUsers: []
}

const appDataReducer = (state = initState, action) => {
  switch (action.type) {
    case ERROR_MESSAGE:
      return {...state, errorMssage: action.payload} ;
    case RECONNECT:
      return {...state, reconnect: action.payload} ;
    case SELECTED_COMPANY:
      return {...state, selectedCompany: action.payload} ;
    case SELECTED_USERS:
      return {...state, selectedUsers: action.payload} ;
    default:
      return state;
  }
};

export default appDataReducer;
