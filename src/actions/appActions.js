import FetchApiData from '../api/FetchApiData'

export const API_DATA = "API_DATA";
export const SELECTED_COMPANY = 'SELECTED_COMPANY';
export const SELECTED_USERS = 'SELECTED_USERS';
export const RECONNECT = "RECONNECT";
export const ERROR_MESSAGE = "ERROR_MESSAGE";

export const apiDataAction = (dataObject) => {
  return {
    type: API_DATA,
    data: dataObject,
  };
};

export const selectedCompanyAction = (dataObject) => {
  return {
    type: SELECTED_COMPANY,
    payload: dataObject,
  };
};

export const selectedUsersAction = (dataArray) => {
  return {
    type: SELECTED_USERS,
    payload: dataArray,
  };
};

export const reconnectAction = (str) => {
  return {
    type: RECONNECT,
    payload: str,
  };
};

export const errorOnFetchApiDataAction = (str) => {
  return {
    type: ERROR_MESSAGE,
    payload: str,
  };
};



export const getApiData = () => {
  return  (dispatch) => {
    return FetchApiData()
      .then((response) => {
        //console.log("getApiData>>>> ", response);
        const {status, data} = response;
        console.log("getApiData>>>>> ",  data, status);
        //initialize the apiDataReducer state in redux store
        if(status && parseInt(status) > 400){
          dispatch(errorOnFetchApiDataAction(status))
        }else{
          dispatch(apiDataAction(data));
        }
        
      })
      .catch((error) => {
        console.log("error>>>>", error)
        dispatch(errorOnFetchApiDataAction(error.message))
      });
  };
};