import React, { useState, useEffect, Suspense  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {BrowserRouter as Router,
  Switch,
  Route,
  Link
 } from "react-router-dom";
import { getApiData, selectedCompanyName } from './actions/appActions'
import Header from './components/header/Header'
import Companies from './components/companies/Companies'
import ErrorMessage from './components/ErrorMessage'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

export const contextAppData = React.createContext(null);

//const baseUrl = 'https://jsonkeeper.com/b/XSMF';

function App() {
  const [apiData, setApiData] = useState({});
  //const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const data = useSelector(state => state.apiDataReducer);
  const { selectedCompany, selectedUsers } = useSelector(state => state.appDataReducer);
  const { reconnect } = useSelector(state => state.appDataReducer);
  const { errorMssage } = useSelector(state => state.appDataReducer);
  

  // useEffect(()=>{
  //   getApiData();
  // },[])
 
  // const getApiData = () => {
  //   FetchApiData(baseUrl)
  //   .then(responce => {
  //     console.log("responce>>>",responce);
  //     setApiData(responce);
  //     setLoading(false);
  //   })
  //   .catch(error => {
  //     console.log("error>>>>", error);
  //     setError(error.message);
  //     setLoading(false)
  //   })
  // }

  

  useEffect(() => {
    console.log("callToFetch")
    callToFetch();
  }, [,reconnect]);

  useEffect(()=>{
    console.log("data>>>>>>", data && Object.entries(data).length > 0);
    if(data && Object.entries(data).length > 0){
      //random select company, according to the task requirements
      if(!selectedCompany){
        const companies = data["organizations"];
        const companyName = companies[Math.floor(Math.random() * companies.length)].name;
        dispatch(selectedCompanyName(companyName));
      }
      setApiData(data);
      setLoading(false);
    }
  },[data]);

  const callToFetch = () => {
    dispatch(getApiData());
  };
   
  if(loading && !errorMssage){
    return <FontAwesomeIcon icon={faSpinner} size="2x" color="#6d6d6f" spin />;
  }

  if(errorMssage){
    return (
      <ErrorMessage msg = {errorMssage} />
    );
  }
  return (
    <contextAppData.Provider value={{ apiData }}>
      <Header selectedCompany={selectedCompany} />
      <Companies data={apiData}/>
    </contextAppData.Provider>  
  );
}

export default App;
