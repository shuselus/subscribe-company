import React, { useState, useEffect, Suspense  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { getApiData, selectedCompanyAction, selectedUsersAction } from './actions/appActions'
import useLocalStorage from './hooks/useLocalStorage'
import Header from './components/header/Header'
import Organizations from './components/companies/Organizations'
import Home from './components/Home'
import ErrorMessage from './components/ErrorMessage'
import styled from 'styled-components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner} from "@fortawesome/free-solid-svg-icons";

//export const contextAppData = React.createContext(null);

const AppContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  min-height: 100vh;
  background-color: var(--app-bg-color);
`;
const Loading = styled.div`
  margin-top: 100px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  span{
    margin-bottom: 15px;
  }
`;


function App() {
 
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const apiData = useSelector(state => state.apiDataReducer);
  const { selectedCompany, selectedUsers } = useSelector(state => state.appDataReducer);
  const { reconnect } = useSelector(state => state.appDataReducer);
  const { errorMssage } = useSelector(state => state.appDataReducer);

   //custom hook for saving end extracting from LocalStorage
   const [selectedCompanyState, setSelectedCompanyState] = useLocalStorage('selectedCompany', null);
   const [selectedUsersState, setSelectedUsersState] = useLocalStorage('selectedUsers', null);
  
  useEffect(() => {
    const callToFetch = () => {
      dispatch(getApiData());
    };
    callToFetch();
  }, []);

  useEffect(()=>{
    console.log("apiData>>>>>>", apiData);
    if(apiData && Object.entries(apiData).length > 0){

      //random select company from the list in case of no recordings 
      //in localStorage, (according to the task requirements)
      const getCompanyData = () => {
        if(selectedCompanyState && Object.entries(selectedCompanyState).length > 0){
        dispatch(selectedCompanyAction(selectedCompanyState));   
        } else {
          const _companies = apiData.organizations;
          const _selsectCompany = _companies[Math.floor(Math.random() * _companies.length)];
          dispatch(selectedCompanyAction(_selsectCompany));
        }
         setLoading(false);  
      }
      getCompanyData();
    }
  },[apiData]);

  useEffect(()=>{
    //get selected from localStorage
    const getStoredData = () => {
      if(selectedCompanyState && Object.entries(selectedCompanyState).length > 0){
        dispatch(selectedCompanyAction(selectedCompanyState));
      }
      if(selectedUsersState?.length){
        dispatch(selectedUsersAction(selectedUsersState));
      }
    }
    getStoredData()
  },[selectedCompanyState, selectedUsersState]);


  useEffect(()=>{
    //saving selected to localStorage
    const updateSelectedData = () => {
      if(selectedCompany && Object.entries(selectedCompany).length > 0){
        setSelectedCompanyState(selectedCompany);
      }
      if(selectedUsers?.length){
        setSelectedUsersState(selectedUsers);
      }
    }
    updateSelectedData()
  },[selectedCompany, selectedUsers]);
  
  if(loading && !errorMssage){
    return (
      <AppContainer>
        <Loading >
        <span>loading...</span>
          <FontAwesomeIcon icon={faSpinner} size="2x" color="#6d6d6f" spin />
        </Loading>
      </AppContainer>
    
    )
  }

  if(errorMssage){
    return (
      <AppContainer>
        <ErrorMessage msg = {errorMssage} />
      </AppContainer>
      
    );
  }
  return (  
      <Router>
        <Switch>
        <>
        <AppContainer className="app-container">
          <Header selectedCompany={selectedCompanyState} /> 
          <Route exact path="/">
            <Home selectedCompany={selectedCompanyState} selectedUsers={selectedUsersState}/> 
          </Route>
          <Route path="/organizations">
            <Organizations data={apiData}/>
          </Route>
          </AppContainer>
        </>
        </Switch>
    </Router>
    
    
    //</contextAppData.Provider>  
  );
}

export default App;
