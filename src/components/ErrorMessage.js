import React from 'react'
import { useDispatch } from 'react-redux'
import { reconnect } from '../actions/appActions'
import styled from 'styled-components'
import { colormap } from '../colormap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFrown } from "@fortawesome/free-solid-svg-icons"
import ActionButton from './ActionButton'


const ErrorMsgContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 300px;
    padding: 10px;
`;
const TextField = styled.h3`
    color: #ff0000;
    font-family: monospace;
    font-size: 20px;
    font-weight: 600;
`;
const Button = styled(ActionButton)`
    font-family: monospace;
    font-size: 20px;
    font-weight: 600;
    width: 300px;
`;

const ErrorMessage = () => {
    const dispatch = useDispatch();
    
    const btnClockHandler = (e) => {
        e.preventDefault();
        dispatch(reconnect(true));
    }

    return (
        <ErrorMsgContainer>
            <FontAwesomeIcon icon={faFrown} size="4x" color="#6d6d6f"/>
            <TextField>
                {
                `Error {reason} - oops, something goes wrong.
                 An unexpected error ocured.
                 Please try to reconnect`
                 }
            </TextField>
            <Button 
               label="reconnect"
               style = {
                   {
                       color: colormap.primaryTxtColor,
                       bgColor: colormap.primaryBgColor,
                   }
                }
                handler = {btnClockHandler}
            />
        </ErrorMsgContainer>
    )
}

export default ErrorMessage
