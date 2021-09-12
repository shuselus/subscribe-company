import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const ButtonContainer = styled.button`
    margin: 1em;
    text-decoration: none;
    border: none;
    font-family: inherit;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.18);
    background-color: ${props => props.color ? props.color : '#556'};
    opacity: 1;
    color: whitesmoke;
    
    padding: 0.25em 1em;

    min-width: 7em;
    min-height: 44px;
    text-align: center;
    line-height: 1.1;
    font-size: ${props => props.fontSize ? props.fontSize : '1em' };
    font-weight: 600;
    grid-area: button;
    justify-self: center;
    @media screen and (-ms-high-contrast: active) {
        border: 2px solid currentcolor;
      }
      &:disabled{
        color: var(--disabled-color);
        opacity: 0.6;
        cursor: not-allowed !important;
        pointer-events: all !important; 
      }
`;



const ActionButton = ({label, style = null, disabled = false, handler = null}) => {
    const [isDisabled, setIsDisabled] = useState(disabled);

    console.log("ActionButton>>>>",label, style, disabled, handler);
    return (
        <ButtonContainer 
            disabled={isDisabled} 
            onClick={handler}
            color={style && style.bgColor}
            fontSize = {style && style.fontSize}
            border = {style && style.border}
            animation={style && style.animation}
        >
            {label}
        </ButtonContainer>
    )
}

export default ActionButton
