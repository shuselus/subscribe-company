import React from 'react'
import { useDispatch } from 'react-redux'
import { reconnect } from '../actions/appActions'
import styled from 'styled-components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFrown } from "@fortawesome/free-solid-svg-icons"
import ActionButton from './ActionButton'


const ErrorMsgContainer = styled.div`
    width: 100%;
    display: flex;
    box-sizing: border-box;
    align-items: space-between;
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

const ErrorMessage = () => {
    const dispatch = useDispatch();

    return (
        <ErrorMsgContainer>
            <FontAwesomeIcon icon={faFrown} size="2x" color="#6d6d6f" spin />;
            <TextField>
                {`Error {reason} - oops, something goes wrong.
                 An unexpected error ocured.
                 Please try to reconnect`}
            </TextField>
            <ActionButton 
               label="reconnect"
               handler={useDispatch(reconnect(true))}
            />
        </ErrorMsgContainer>
    )
}

export default ErrorMessage
