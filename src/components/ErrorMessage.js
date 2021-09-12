import React from 'react'
import { useDispatch } from 'react-redux'
import { reconnectAction } from '../actions/appActions'
import styled from 'styled-components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFrown } from "@fortawesome/free-solid-svg-icons"
import ActionButton from './ActionButton'


const ErrorMsgContainer = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 300px;
    padding: 10px;
    background: red;
    margin-top: 50px;
`;
const TextField = styled.h3`
    color: white;
    font-family: 'Roboto';
    font-size: 32px;
    font-weight: 600;
    text-align: center;
`;
const Button = styled(ActionButton)`
    font-family: monospace;
    font-size: 2em;
    font-weight: 600;
    width: 300px;
    background-color: white'
    color: red;
`;

const ErrorMessage = ({message}) => {
    const dispatch = useDispatch();
    
    const reconnectHandler = (e) => {
        e.preventDefault();
        dispatch(reconnectAction(true));
    }

    return (
        <ErrorMsgContainer>
            <FontAwesomeIcon icon={faFrown} size="6x" color="#fff"/>
            <TextField>
                {
                `Error ${parseInt(message)} - oops, something goes wrong.
                 An unexpected error ocured.
                 Please try to reconnect`
                 }
            </TextField>
            <Button 
               label="try to reconnect"
               handler = {reconnectHandler}
            />
        </ErrorMsgContainer>
    )
}

export default ErrorMessage
