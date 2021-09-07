import React, { useState } from 'react'
import styled from 'styled-components'
import colormap from '../colormap';

const ButtonContainer = styled.button`
    background: ${props => props.primary ? "palevioletred" : "white"};
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
`;

const ButtonLabel = styled.label`
    color: ${props => props.primary ? "white" : "palevioletred"};
    font-size: 1em;
`;

const ActionButton = ({label, style, handler}) => {
    const [disabled, setDisabled] = useState(false);
    

    return (
        <ButtonContainer 
            disabled={disabled} 
            onClick={handler}
            color={style.color}
            animation={style.animation}
        >
            <ButtonLabel>{label}</ButtonLabel>
        </ButtonContainer>
    )
}

export default ActionButton
