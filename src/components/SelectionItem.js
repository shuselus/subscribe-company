import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import useToggle from '../hooks/useToggle'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck} from "@fortawesome/free-solid-svg-icons";

const SelectContainer = styled.label`
    font-size: 1.3rem;
    color: var(--color);
    display: grid;
    grid-template-columns: min-content auto;
    grid-gap: 0.5em;
    align-items: center;
    justify-items: start;
    overflow: hidden;
    .select-label {
        line-height: ${props => props.type === 'checkbox' ? '1.8' : '1.5'};
    }
`;
const InputContainer = styled.span` 
    ${props => props.type === 'checkbox' && 
       ` display: grid;
         grid-template-areas: "checkbox";
     
       > * {
         grid-area: checkbox;
       }
       input:checkbox:disabled + .select-control {
        color: var(--disabled-color);
      }
    `}
    
    input{
        display: flex;
        opacity: 0;
        width: ${props => props.type === 'checkbox' ? '1em' : '0'};
        height: ${props => props.type === 'checkbox' ? '1em' : '0'};;
        ${props => props.type === 'checkbox' 
            ? `
            .select-control svg {
                opacity: 0;
            }
            &:checked + .select-control svg {
                opacity: 1;
                transform: translateY(-0.33em);
                transform: scale(1);
            }` :`
            &:checked + .select-control {
                background: radial-gradient(currentcolor 50%, rgba(255, 0, 0, 0) 51%);
            }`
        }
    }
    .select-control {
        display: block;
        width: ${props => props.type === 'checkbox' ? '1em' : '0.8em'};
        height: ${props => props.type === 'checkbox' ? '1em' : '0.8em'};
        border: 0.1em solid currentColor;
        transform: translateY(0.08em);
        ${props => props.type === 'checkbox' 
            ? `border-radius: 0.25em;`
            : `border-radius: 50%;`
         }
    }`;

const SelectionItem = ({data, type, groupName, defaultSelected = null, handler}) => {
    const [itemData, setItemData] = useState({...data});
    const [isChecked, setIsChecked] = useToggle(false);
    const [isDisabled, setIsDisabled] = useState(false);
    console.log("SelectionItem>>>>", type, groupName, defaultSelected);
    const onChangeHandler = (e) => {
        e.preventDefault();
        setIsChecked(prev => !prev);
    }
    useEffect(() => {
        handler(itemData, isChecked);
    }, [isChecked])

    return (
        <div>
            <SelectContainer type={type}>
                <InputContainer type={type}>
                <input
                    type={type}
                    name={groupName}
                    checked={isChecked}
                    defaultChecked={defaultSelected}
                    disabled = {isDisabled}
                    onChange={onChangeHandler}
                />
                <span className="select-control">
                    {
                        type === 'checkbox' && 
                        <FontAwesomeIcon icon={faCheck} color={isDisabled ? 'var(--disabled-color)' : 'var(--primary-color)'} size="1x" />
                    }
                   
                </span>
                </InputContainer>
                <span className="select-label">{itemData.name}</span>
            </SelectContainer>
        </div>
    )
}

export default SelectionItem
