import React, { useState } from 'react'
import styled from 'styled-components'
import { colormap } from '../colormap';

const ButtonContainer = styled.button`
    background: ${props => props.color ? props.color : 'none'};
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid  
    ${props => props.border ?
        props.border : 
        !props.color ?
        colormap.primaryBgColor :
        'none'};
    border-radius: 3px;
    cursor: pointer;
`;

const ButtonLabel = styled.label`
    color: ${props => props.color ? props.color : colormap.primaryTxtColor};
    font-size: 1em;
`;

const ActionButton = ({label, style, disabled, handler}) => {
    const [isDisabled, setIsDisabled] = useState(disabled ?? false);
    
    console.log("ActionButton>>>>",label, style, disabled, handler);
    return (
        <ButtonContainer 
            disabled={isDisabled} 
            onClick={handler}
            color={style && style.bgColor}
            border = {style && style.border}
            animation={style && style.animation}
        >
            <ButtonLabel
                color={style && style.color}
            >
                {label}
            </ButtonLabel>
        </ButtonContainer>
    )
}

export default ActionButton
