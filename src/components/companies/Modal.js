import React, { useState, useEffect, useCallback, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { selectedCompanyAction, selectedUsersAction} from '../../actions/appActions'
import useToggle from '../../hooks/useToggle'
import styled from 'styled-components'
import DropdownSelect from './DropdownSelect'
import ActionButton from '../ActionButton'


 //display: ${props=> props.displayModal ? 'block' : 'none'};

const ModalContainer = styled.div`
    opacity: ${props=> props.displayModal ? '1' : '0'};
    transform: ${props=> props.displayModal ? 'scale(1,1)' : 'scale(0,0)'};
    position: fixed;
    z-index: 5;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    overflow: auto;
    background-color: rgba(0,0,0,0.7);
    transition: all .3s ease-out;
    margin: auto 0
  `;

const ModalContent = styled.div` {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 50%;
    height: 50%;
    min-height: 600px;
    min-width: 600px;
  `;
const CloseBtn = styled.span` {
    position: absolute;
    top: 20px;
    right: 20px;
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;  
    &:hover, :focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }
    `;
const DSelectContainer = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 300px;
    grid-template-areas: 
    "company user" 
    "button button";
    grid-gap: 1fr;
    place-items: center;
    width:100%;
    height: 100%;
    justify-items: center;
`;

const Modal = ({data, displayModal}) => {
    const [showModal, setShowModal] = useToggle(false);
    const [users, setUsers] = useState([]);
    const [selectedUsersState, setSelectedUsersState] = useState([]);
    const [btnIsDisabled, setBtnIsDisabled] = useState(true);
    const {selectedCompany, selectedUsers} = useSelector(state => state.appDataReducer);
    const modalRef = useRef(null)
    const dispatch = useDispatch();
    const history = useHistory();

    console.log("Modal>>>>",data, displayModal);
    
    useEffect(() => {
        setShowModal(displayModal);
        if(displayModal){
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [displayModal]);

    useEffect(()=>{
       if(selectedUsersState?.length){
         setBtnIsDisabled(false)
       }
    },[selectedUsersState]);

    const handleClickOutside = (e) => {
        if (!modalRef.current.contains(e.target)) {
            setShowModal(false);
        } 
      }

    const updateUsersData = (company) => {
        console.log("updateUsersData>>>>",company, data)
        const usersData = data.users.filter(user => 
            user.organizationId === company.id);
        let modefiedUsersData = [];
        usersData.forEach((user) =>{
            let selected = null;
            if(selectedUsers?.length){
               selected =  selectedUsers.find(({id})=> id === user.id);
            }
            const obj = {
                name: `${user.firstName} ${user.lastName}`,
                id: user.id, 
                organizationId: user.organizationId,
                selected: !!selectedUsers.find(({id})=> user.id === id)
            }
            modefiedUsersData.push(obj);
        })
        //console.log("usersData>>>>>", modefiedUsersData);
        setUsers(modefiedUsersData);
    }
    
    const getSelectedCompany = useCallback((company) => {
        //console.log("getSelectedData>>>>", company.name);
        updateUsersData(company)
        dispatch(selectedCompanyAction(company));    
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
            updateUsersData(selectedCompany);
            return;
        }
        const res = users.filter(user => user.name.toLowerCase().includes(value));
        if(res.length === 0){
            updateUsersData(selectedCompany);
            return;
        }
        console.log("searchHandler>>>", value, res);
        setUsers(res);
    },[users]);

    const onSubmit = (e) => {
        e.preventDefault();
        //prevent duplicates of users
        const unicSelectedUsers = [...new Set([...selectedUsers,...selectedUsersState])];
        dispatch(selectedUsersAction(unicSelectedUsers));
        history.push('/');
     }

    return (
        <ModalContainer className="ModalContainer" displayModal={showModal} ref={modalRef}>
            <ModalContent className="ModalContent">
                <DSelectContainer  className='DSelectContainer'>
                    <DropdownSelect 
                        data={data.organizations} 
                        type="radio" 
                        title="company" 
                        defaultSelected={selectedCompany.name}
                        getSelectedHandler={getSelectedCompany}/>
                    <DropdownSelect 
                        data={users} 
                        type="checkbox" 
                        title="user" 
                        seartchField={true}
                        selectedCounter={selectedUsersState.length}
                        getSelectedHandler={getSelectedUser}
                        searchHandler={searchHandler}/>
                    <ActionButton disabled={btnIsDisabled} label="SUBMIT" style={{fontSize: '1.5em'}} handler={onSubmit}/>
                </DSelectContainer>
                <CloseBtn onClick={setShowModal}>&times;</CloseBtn>
            </ModalContent>
        </ModalContainer>
    )
}

export default Modal
