import React, { useState, useEffect, Suspense  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getApiData, apiDataAction, selectedCompanyAction, selectedUsersAction } from './actions/appActions'
import FetchApiData from './api/FetchApiData'
import styled from 'styled-components'
import Header from './components/header/Header'
import Organizations from './components/companies/Organizations'
import Home from './components/Home'
import ErrorMessage from './components/ErrorMessage'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner} from "@fortawesome/free-solid-svg-icons";

//export const contextAppData = React.createContext(null);
//const baseUrl = 'https://jsonkeeper.com/b/XSMF';

const AppContainer = styled.div`
position: relative;
display: flex;
flex-flow: column;
align-items: center;
justify-content: flex-start;
width: 100%;
height: 100vh;
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
  //const [apiData, setApiData] = useState({});
  const [company, setCompany] = useState({});
  const [users, setUsers] = useState({});
  //const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const apiData = useSelector(state => state.apiDataReducer);
  const { selectedCompany, selectedUsers } = useSelector(state => state.appDataReducer);
  const { reconnect } = useSelector(state => state.appDataReducer);
  const { errorMssage } = useSelector(state => state.appDataReducer);
  
  useEffect(() => {
    const callToFetch = () => {
      dispatch(getApiData());
    };
    console.log("callToFetch");
    callToFetch();

    const getFromLocalStorage = () => {
      if(localStorage.getItem('selectedCompany') !== null){
        const _selectedCompany = JSON.parse(localStorage.getItem('selectedCompany'));
        dispatch(selectedCompanyAction(_selectedCompany));
      }
      if(localStorage.getItem('selectedUsers') !== null){
          const _selectedUsers =  JSON.parse(localStorage.getItem('selectedUsers'));
          dispatch(selectedUsersAction(_selectedUsers));
      }
    }

    getFromLocalStorage();
  }, [])

  useEffect(()=>{
   
    const updateSelectedData = () => {
      if(selectedCompany && Object.entries(selectedCompany).length > 0){
        setCompany(prevState => selectedCompany);
      }
      if(selectedUsers?.length){
        setUsers(prevState => selectedUsers);
      }
    }

    updateSelectedData();

    const saveInLocalStorage = () => {
         if(selectedCompany && Object.keys(selectedCompany).length > 0){
           localStorage.setItem('selectedCompany', JSON.stringify(selectedCompany));
         }   
         if(selectedUsers && selectedUsers?.length){
           localStorage.setItem('selectedUsers', JSON.stringify(selectedUsers));
         }
    }
    //saveInLocalStorage();

   },[selectedUsers, selectedCompany]);

  useEffect(()=>{
    console.log("apiData>>>>>>", apiData, apiData && Object.entries(apiData).length > 0);
    if(apiData && Object.entries(apiData).length > 0){

      //random select company from the list in case of no recordings 
      //in localStorage, (according to the task requirements)
      const getRandomCompany = () => {
        if(!(selectedCompany && Object.keys(selectedCompany).length > 0)){
          const companies = apiData.organizations;
          const selsectCompany = companies[Math.floor(Math.random() * companies.length)];
          dispatch(selectedCompanyAction(selsectCompany));     
          localStorage.setItem('selectedCompany', JSON.stringify(selectedCompany));  
        }
        setLoading(false);
      }

      getRandomCompany();
     
    }
  },[apiData]);
   
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
          <Header selectedCompany={company} /> 
          <Route exact path="/">
            <Home selectedCompany={company} selectedUsers={users}/> 
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
