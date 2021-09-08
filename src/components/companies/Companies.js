import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectedCompanyName, selectedUsers } from '../../actions/appActions'
import styled from 'styled-components'
import { colormap } from '../../colormap'
//import FormWrupper from  './FormWrupper'
import DropdownSelect from './DropdownSelect'
//import PropTypes from 'prop-types'

const Container = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${colormap.primaryTxtColor};
`;
const FormContainer = styled.div`
    position: relative;
    display: grid;
    grid-template-columns:repeat( auto-fit, minmax(250px, 1fr) );;
    grid-gap: 2em;
    align-items: center;
    justify-items: center;
    width: 40em;
;
`;

const Companies = ({data}) => {
    const [users, setUsers] = useState([]);
    const [selectedUsersData, setSelectedUsersData] = useState([]);
    const {selectedCompany} = useSelector(state => state.appDataReducer);
    const dispatch = useDispatch();
    console.log("Companies>>>>", data);

    const getSelectedCompany = useCallback((company) => {
        console.log("getSelectedData>>>>", company.name);
        dispatch(selectedCompanyName(company.name));
        const usersData = data.users.filter(user => 
                    user.organizationId === company.id);
        let modefiedUsersData = []
        usersData.forEach((user) =>{
            const obj = {
               name: `${user.firstName} ${user.lastName}`,
               id: user.id, 
               organizationId: user.organizationId
            }
            modefiedUsersData.push(obj);
        })
       console.log("usersData>>>>>", modefiedUsersData);
       setUsers(modefiedUsersData);
    },[data]);

    const getSelectedUser = useCallback((selected, checked) => {
        console.log("getSelectedUser>>>>", selected, checked);
        
        if(checked){
            const selectedUsers = selectedUsersData.filter(user => user.id !== selected.id);
            setSelectedUsersData([...selectedUsers]);
        }else{
            const userData = data.users.find(user => user.id === selected.id);
            setSelectedUsersData([...selectedUsers, userData]);
        }
        
    },[data]);

    const onSubmit = (e) => {
       e.preventDefault();
       dispatch(selectedUsers(selectedUsers));
       //Link to Home page
    }

    return (
        <Container>
            <FormContainer>
            <DropdownSelect 
                data={data.organizations} 
                type="radio" 
                title="company" 
                selectedItem={selectedCompany}
                handler={getSelectedCompany}/>
            <DropdownSelect 
                data={users} 
                type="checkbox" 
                title="user" 
                handler={getSelectedUser}/>
            </FormContainer>
        </Container>
    )
}

export default React.memo(Companies)
