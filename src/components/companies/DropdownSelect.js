import React, {useState} from 'react'
import styled, {keyframes} from 'styled-components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp} from "@fortawesome/free-solid-svg-icons";
import { colormap } from '../../colormap'

const Container = styled.div`
    position: relative;
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    justify-content: center;
    width: 250px;
    min-width: 150px;
    max-height: 300px;
`;
const Expander= styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 1fr;
    width: 100%;
    border-radius: 6px;
    border: 1px solid gray;
    padding: 6px 6px 9px 6px;
    .expand-btn{
        width: 18px;
        height: 18px;
        cursor: pointer
    }
`;
const dropdown_anim = keyframes`
 from { top: -250px; opacity: 0; }
 to { top: 36px; opacity: 1; }
`;
const ListContainer = styled.div`
   position: absolute;
   width: 100%;
   display: block;
   margin: 0 auto;
  
    animation-name: ${dropdown_anim};  
    animation-duration: 0.5s;
    animation-iteration-count: 1;
    animation-direction: ${props => props.expanded ? 'normal' : 'reverse'}; 
    animation-timing-function: ease-in;
`;
const Radio = styled.label`
    font-size: 1.3rem;
    color: var(--color);
    display: grid;
    grid-template-columns: min-content auto;
    grid-gap: 0.5em;
    align-items: center;
    justify-items: start;
    .radio-label {
        line-height: 1.5;
    }
    overflow: hidden;
`;
const RadioInput= styled.span` 
    input {
        display: flex;
        opacity: 0;
        width: 0;s
        height: 0;
        &:checked + .radio-control {
            background: radial-gradient(currentcolor 50%, rgba(255, 0, 0, 0) 51%);
        }
    }
    .radio-control {
        display: block;
        width: 0.8em;
        height: 0.8em;
        border-radius: 50%;
        border: 0.1em solid currentColor;
        transform: translateY(-0.05em);
      }
`;

const DropdownSelect = (
{
    data,
    type,
    title,
    selectionType,
    seartchField,
    selectedCompany,
    handler
}
) => {
    const [expanded, setExpanded] = useState(false);
    const [expandBtnIsDisabled, setExpandBtnIsDisabled] = useState(!data?.length);
    
    const dropdownToggle = (e) => {
        e.preventDefault();
        setExpanded(prev => !prev);
    }
 


    return (
        <Container>
        <Expander onClick={dropdownToggle}>
            <span>select {title}</span>
            <div className="expand-btn"  disabled={expandBtnIsDisabled} >
                   <FontAwesomeIcon icon={faChevronUp} color="#7b1fa2" size="xs" rotation={expanded ? 180 : 0} />
            </div>
        </Expander>
        <ListContainer 
        expanded={expanded}
        onAnimationComplete={(()=>({display: 'none'}))}
        >
        {data?.length &&
          data.map(({ name, id }) => (
            <Radio key={id}>
              <RadioInput>
                <input
                  type={type}
                  name={title}
                  value={name}
                  defaultChecked={selectedCompany === name}
                  onChange={(e) => handler(e.target.name)}
                />
                <span className="radio-control"></span>
              </RadioInput>
              <span className="radio-label">{name}</span>
            </Radio>
          ))}
          </ListContainer>
      </Container>
    )
}

export default DropdownSelect
