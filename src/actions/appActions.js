import FetchApiData from '../api/FetchApiData'

export const API_DATA = "API_DATA";
export const SELECTED_COMPANY = 'SELECTED_COMPANY';
export const SELECTED_USERS = 'SELECTED_USERS';
export const RECONNECT = "RECONNECT";
export const ERROR_MESSAGE = "ERROR_MESSAGE";

export const apiData = (data) => {
  return {
    type: API_DATA,
    data: data,
  };
};

export const selectedCompanyName = (name) => {
  return {
    type: SELECTED_COMPANY,
    payload: name,
  };
};

export const selectedUsers = (data) => {
  return {
    type: SELECTED_USERS,
    payload: data,
  };
};

export const reconnect = (msg) => {
  return {
    type: RECONNECT,
    payload: msg,
  };
};

export const errorOnFetchApiData = (data) => {
  return {
    type: ERROR_MESSAGE,
    payload: data,
  };
};



export const getApiData = () => {
  return  (dispatch) => {
    return FetchApiData()
      .then(({ data }) => {
        console.log("getApiData>>>> ", data);
        dispatch(apiData(data));
        dispatch(selectedCompanyName(data["companies"][Math.floor(Math.random()*data.length)]))
      })
      .catch((error) => dispatch(errorOnFetchApiData(error)));
  };
};

// export const updateCurrentSectionMap = (changeData) => {
//   return  (dispatch, getState) => {
    
//     const data = getState().currentSectionDataReducer;
//     if(data.hasOwnProperty(changeData.name)){
//       let obj = data[changeData.name][0];
//       for(const key in obj){
//         if (key === changeData.subName){
//           obj[key] = changeData.value;
//         }
//       }
//       dispatch(currentSectionData(data));
//     }     
//   }
// }