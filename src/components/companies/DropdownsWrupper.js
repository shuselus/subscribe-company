import React, { useState, useEffect, useCallback, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import useOutsideClick from "../../hooks/useOutsideClick";
import { selectedCompanyAction, selectedUsersAction} from '../../actions/appActions'
//import useToggle from '../../hooks/useToggle'
import styled from 'styled-components'
import DropdownSelect from './DropdownSelect'
import ActionButton from '../ActionButton'

const DdSelectContainer = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 300px;
    grid-template-areas: 
    "company user" 
    "button button";
    grid-gap: 2em;
    place-items: center;
    width:70%;
    height: 100%;
    justify-items: center;
`;


const DropdownsWrupper = () => {
    const [users, setUsers] = useState([]);
    const [selectedUsersState, setSelectedUsersState] = useState([]);
    const [btnIsDisabled, setBtnIsDisabled] = useState(true);
    const data = useSelector(state => state.apiDataReducer);
    const {selectedCompany, selectedUsers} = useSelector(state => state.appDataReducer);
    const [expandCompanies, setExpandCompanies] = useState(true);
    const [expandUsers, setExpandUsers] = useState(true);
    
    const DDCompaniesRef = useRef(null);
    const DDUsersRef = useRef(null);

    const dispatch = useDispatch();
    const history = useHistory();

    useOutsideClick([DDCompaniesRef, DDUsersRef], ()=>{
        if(expandCompanies){
            setExpandCompanies(false);
        }
        if(expandUsers){
            setExpandUsers(false);
        }
    });
    // useOutsideClick(DDUsersRef, ()=>{
    //     if(expandUsers){
    //        setExpandUsers(false);
    //     }
    // });
    useEffect(()=>{
        if(selectedUsers?.length){
            setSelectedUsersState(selectedUsers)
        }
     },[selectedUsers]);

    useEffect(()=>{
       if(selectedUsersState?.length){
         setBtnIsDisabled(false)
       }
    },[selectedUsersState]);

    const updateDropDownListUsersData = (company) => {
        //console.log("updateDropDownListUsersData>>>>",company, data.data)
        const usersData = data.users.filter(user => 
            user.organizationId === company.id);
        let modefiedUsersData = [];
        //setSelectedUsersState(selectedUsers);
        usersData.forEach((user) =>{
            const obj = {
                name: `${user.firstName} ${user.lastName}`,
                id: user.id, 
                organizationId: user.organizationId,
                selected: !!selectedUsers.find((item) => user.id === item.id)
            }

            modefiedUsersData.push(obj);
            setExpandUsers(true);
        })
        //console.log("usersData>>>>>", modefiedUsersData);
        setUsers(modefiedUsersData);
    }
    
    const getSelectedCompany = useCallback((company) => {
        //console.log("getSelectedData>>>>", company.name);
        setSelectedUsersState([]);
        updateDropDownListUsersData(company)
        dispatch(selectedCompanyAction(company));  
        //setExpandCompanies(true);
    },[data]);

    const getSelectedUser = useCallback((selected, checked) => {
        //console.log("getSelectedUser>>>>", selected, checked);
        if(!checked){
            if(selectedUsersState.length === 0) return;
            //remove user from the list
            const selectedUsers = selectedUsersState.filter(user => user.id !== selected.id);
            setSelectedUsersState([...selectedUsers]);
        }else{
            //add new user
            const userData = data.users.find(user => user.id === selected.id);
            setSelectedUsersState([...selectedUsersState, userData]);
        }
    },[selectedUsersState]);
    
    const searchHandler = useCallback( value => {
        if(value == ""){
            updateDropDownListUsersData(selectedCompany);
            return;
        }
        const res = users.filter(user => user.name.toLowerCase().includes(value));
        if(res.length === 0){
            updateDropDownListUsersData(selectedCompany);
            return;
        }
        console.log("searchHandler>>>", value, res);
        setUsers(res);
    },[users]);

    const updateExpandingState = useCallback((state, name) => {
        if(name === 'company'){
            setExpandCompanies(state);
        }else{
            setExpandUsers(state)
        }
    },[]);

    const onSubmit = (e) => {
        e.preventDefault();
        //prevent duplicates of users
        const unicSelectedUsers = [...new Set([...selectedUsersState])];
        dispatch(selectedUsersAction(unicSelectedUsers));
        history.push('/');
     }


    return (
        <DdSelectContainer  className='DSelectContainer'>
        <DropdownSelect 
            ref={DDCompaniesRef}
            data={data.organizations} 
            type="radio" 
            title="company" 
            defaultSelected={selectedCompany.name}
            isExpanded={expandCompanies}
            getSelectedHandler={getSelectedCompany}
            updateExpandingState={updateExpandingState}/>
        <DropdownSelect 
            ref={DDUsersRef}
            data={users} 
            type="checkbox" 
            title="user" 
            isExpanded={expandUsers}
            seartchField={true}
            selectedCounter={selectedUsersState.length}
            getSelectedHandler={getSelectedUser}
            searchHandler={searchHandler}
            updateExpandingState={updateExpandingState}/>
        <ActionButton disabled={btnIsDisabled} label="SUBMIT" style={{fontSize: '1.5em'}} handler={onSubmit}/>
    </DdSelectContainer>
    )
}

export default DropdownsWrupper
