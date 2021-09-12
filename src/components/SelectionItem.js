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
        line-height: ${props => props.type === 'checkbox' ? '1.6' : '1.5'};
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
                
                &:checked + .select-control svg {
                    transform: translateY(-0.33em);
                    transform: scale(1);
                }`
            :`
                &:checked + .select-control {
                    background: radial-gradient(currentcolor 50%, rgba(255, 0, 0, 0) 51%);
                }`
        }
    }
    .select-control {  
        border: 0.1em solid currentColor;
        transform: translateY(0.08em);
         ${props => props.type === 'checkbox' 
         ? `
            display: inline-grid;
            width: 0.8em;
            height: 0.8em;
            border-radius: 0.25em;
            svg {
                transition: transform 0.1s ease-in 25ms;
                transform: scale(0);
                transform-origin: bottom left;
              }
        `:`
            display: block;
            width: 0.8em;
            height: 0.8em;
            border-radius: 50%;
        `}
    }`;

const SelectionItem = ({data, type, groupName, defaultSelected = null, handler}) => {
    const [itemData, setItemData] = useState({...data});
    const [isChecked, setIsChecked] = useToggle();
    const [isDisabled, setIsDisabled] = useState(false);
   // console.log("SelectionItem>>>>", type, groupName, defaultSelected);

     const onChangeHandler = (e) => {
         setIsChecked(e.target.checked);
         handler(itemData, e.target.checked);
     }

    //  useEffect(() => {
    //      handler(itemData, isChecked);
    //  }, [isChecked])

    return (
        <div>
            <SelectContainer type={type}>
                <InputContainer type={type}>
                <input
                    type={type}
                    name={groupName}
                    // checked={isChecked}
                    defaultChecked={defaultSelected}
                    disabled = {isDisabled}
                    onChange={onChangeHandler}
                />
                <span className="select-control">
                    {
                        type === 'checkbox' && 
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <path
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            d="M1.73 12.91l6.37 6.37L22.79 4.59"
                            />
                        </svg>
                    }
                   
                </span>
                </InputContainer>
                <span className="select-label">{itemData.name}</span>
            </SelectContainer>
        </div>
    )
}

export default SelectionItem
