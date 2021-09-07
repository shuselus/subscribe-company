import React, {useState} from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp} from "@fortawesome/free-solid-svg-icons";
import { colormap } from '../../colormap'

const Container = styled.div`
    :root {
        --color: rgb(119, 119, 119);
    }
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    justify-content: center;
    width: 250px;
    min-width: 150px;
    max-height: 300px;
    overflow: hidden;
`;
const Expander= styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 1fr;
    width: 100%;
    border-radius: 6px;
    border: 1px solid gray;
    padding: 6px;
    .expand-btn{
        width: 18px;
        height: 18px;
    }
`;
const Radio= styled.label`
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
    tytle,
    selectionType,
    seartchField,
    selectedCompany,
    handler
}
) => {
    const [expand, setExpand] = useState(false);
    const [expandBtnIsDisabled, setExpandBtnIsDisabled] = useState(!data?.length);
    


    return (
        <Container>
        <Expander>
            <span>select {tytle}</span>
            <div className="expand-btn"  disabled={expandBtnIsDisabled} onClick={setExpand(prev=> !prev)}>
                   <FontAwesomeIcon icon={faChevronUp} color="#7b1fa2" size="xs" rotation={expand ? 180 : 0} />
            </div>
        </Expander>
        {data?.length &&
          data.map(({ name, id }) => (
            <Radio key={id}>
              <RadioInput>
                <input
                  type="radio"
                  name="companies"
                  value={name}
                  defaultChecked={selectedCompany === name}
                  onChange={(e) => handler(e.target.name)}
                />
                <span className="radio-control"></span>
              </RadioInput>
              <span className="radio-label">{name}</span>
            </Radio>
          ))}
      </Container>
    )
}

export default DropdownSelect
