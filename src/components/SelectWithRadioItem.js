import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

const SelectContainer = styled.label`
    font-size: 1.3rem;
    color: var(--color);
    display: grid;
    grid-template-columns: min-content auto;
    grid-gap: 0.5em;
    align-items: center;
    justify-items: start;
    overflow: hidden;
    .radio-label {
        line-height: 1.5;
    }
`;
const RadioInput= styled.span` 
    input {
        display: flex;
        opacity: 0;
        width: 0;
        height: 0;
        ${props => props.type === 'radio' && `
        &:checked + .radio-control {
            background: radial-gradient(currentcolor 50%, rgba(255, 0, 0, 0) 51%);
        `}
    }
    .radio-control {
        display: block;
        width: 0.8em;
        height: 0.8em;
        border: 0.1em solid currentColor;
        transform: translateY(-0.28em);
        ${props => props.type === 'radio' && `
           border-radius: 50%;
        `}
      }
`;


const SelectWithRadioItem = ({data, type, groupName, selectedItem = null, handler}) => {
    const [itemData, setItemData] = useState({...data});
    const [isChecked, setIsChecked] = useToggle(false);
    const [isDisabled, setIsDisabled] = useState(false);
    return (
        <SelectContainer type={type}>
        <RadioInput type={type}>
          <input
            type={type}
            name={title}
            value={isChecked}
            defaultChecked={selectedItem && selectedItem === itemData.name}
            disabled = {isDisabled}
            onChange={(e) => handler(itemData)}
            
          />
          <span className="radio-control"></span>
        </RadioInput>
        <span className="radio-label">{itemData.name}</span>
      </SelectContainer>
    )
}

export default SelectWithRadioItem
