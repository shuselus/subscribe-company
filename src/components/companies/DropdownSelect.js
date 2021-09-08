import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import useToggle from '../../hooks/useToggle'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp} from "@fortawesome/free-solid-svg-icons";
import SelectionItem from '../SelectionItem'
//import { colormap } from '../../colormap'

const Container = styled.div`
    position: relative;
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    justify-content: center;
    width: inherit;
    height: inherit;
    width: 250px;
    min-width: 150px;
    max-height: 300px;
`;
const Expander= styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    width: 100%;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    ${props => props.expanded && `
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
    `}
    border: 1px solid ${params => params.disabled ? 'var(--disabled-color)' : 'var(--primary-color)'};
    padding: 6px 6px 9px 6px;
    & span{
        color: ${params => params.disabled ? 'var(--disabled-color)' : 'var(--primary-color)'};
    }
    .expand-btn{
        width: 18px;
        height: 18px;
        cursor: pointer
    }
`;
const DropdownContent = styled.div`
    position: absolute;
    width: 100%;
    display: block;
    margin: 0 auto;
    border-left: 1px solid var(--color);
    border-bottom: 1px solid var(--color);
    border-right: 1px solid var(--color);
    padding: 6px 12px;
    transition: all 0.2s ease-in;
    left: 0;
    top: -100%;
    opacity: 0;
    visibility: hidden;
    ${props => props.expanded && 
      `top: 100%;
       opacity: 1;
       visibility: visible !important;
      `
    }
    height: 260px;
    max-height: 260px;
    overflow-y: auto;
`;


    

const DropdownSelect = (
{
    data,
    type,
    title,
    seartchField,
    defaultSelected,
    handler
}
) => {
    const [listData, setListdata] =  useState([...data]);
    const [expanded, setExpanded] = useToggle(false);
    const [expandIsDisabled, setExpandIsDisabled] = useState(false);

    console.log("DropdownSelect>>>",type, title,!data?.length);

    useEffect(() => {
        if(data?.length){
            setListdata([...data]);
            setExpandIsDisabled(false);
            setExpanded(true)
        }
        return () => {
           // cleanup
        }
    }, [data])

    const dropdownToggle = (e) => {
        if(expandIsDisabled) return;
        e.preventDefault();
        setExpanded(prev => !prev);
    }

    return (
        <Container>
        <Expander disabled={expandIsDisabled} onClick={dropdownToggle}>
            <span>select {title}</span>
            <div className="expand-btn"   >
                   <FontAwesomeIcon icon={faChevronUp} color={expandIsDisabled ? 'var(--disabled-color)' : 'var(--primary-color)'} size="xs" rotation={expanded ? 180 : 0} />
            </div>
        </Expander>
        <DropdownContent expanded={expanded}>
        {listData?.length &&
          data.map((item) => (
              <SelectionItem 
              key={item.id} 
              type={type} 
              data={item}
              groupName={title} 
              defaultSelected={defaultSelected && defaultSelected === item.name}
              handler={handler}
              />
            // <Radio key={item.id} type={type}>
            //   <RadioInput type={type}>
            //     <input
            //       type={type}
            //       name={title}
            //       value={item.name}
            //       data = {item}
            //       defaultChecked={selectedItem && selectedItem === item.name}
            //       onChange={(e) => handler(item)}
            //     />
            //     <span className="radio-control"></span>
            //   </RadioInput>
            //   <span className="radio-label">{item.name}</span>
            // </Radio>
          ))}
          </DropdownContent>
      </Container>
    )
}

export default DropdownSelect
