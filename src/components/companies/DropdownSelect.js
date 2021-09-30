import React, {forwardRef, useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
//import useToggle from '../../hooks/useToggle'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faSearch } from "@fortawesome/free-solid-svg-icons";
import SelectionItem from '../SelectionItem'

const Container = styled.div`
    position: absolute;
    display: block;
    width: 270px;
    height: 300px;
    min-width: 150px;
    max-height: 300px;
    grid-area: ${props => props.title};
    margin-top: 50px;
`;

const Expander= styled.div`
    position:relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    width: 100%;
    background: var(--dd-bgr);
    border-radius: 6px;
    transition:  all 0.2s ease-in;
    ${props => props.expanded && `
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    `}
    border: 1px solid ${params => params.disabled ? 'var(--disabled-color)' : 'var(--primary-color)'};
    padding: 6px 6px 9px 6px;
    z-index: 3;
    & span{
        color: ${params => params.disabled ? 'var(--disabled-color)' : 'var(--primary-color)'};
    }
    .expand-btn{
        width: 18px;
        height: 18px;
        cursor: pointer;
    }
`;
const DropdownContent = styled.div`
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--primary-bg-color);
    border-left: 1px solid var(--color);
    border-bottom: 1px solid var(--color);
    border-right: 1px solid var(--color);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    padding: 6px 12px;
    transition: all 0.2s ease-in;
    opacity: 0;
    visibility: hidden;
    box-shadow: 
    0px 2px 1px -1px rgb(0 0 0 / 20%), 
    0px 1px 1px 0px rgb(0 0 0 / 14%), 
    0px 1px 3px 0px rgb(0 0 0 / 12%);
    transform-origin: 79px 0px;
    ${props => props.expanded && 
      `top: 40px;
       opacity: 1;
       visibility: visible !important;
      `
    }
    height: 260px;
    max-height: 260px;
    overflow-y: auto;
`;

const SearchFieldContainer = styled.div`
   width: 100%;
   height: 30px;
   border: 1px solid gray;
   margin: 4px 0;
   padding: 4px 8px;
   display: flex;
   align-items: center;
   justify-content: space-between;
   input[type='text']{
     border: none;
     &:focus{
        outline: none;
     }
   }
`;

const Title = styled.span`
   color: var(--primary-color);
   font-size: 17px;
   font-weight: 600;
   padding: 0 8px;
`

const Loader = styled.span`
    color: var(--primary-color);
    font-size: 17px;
    font-weight: 600;
    align-self: center;
`;

const maxDataLength = 60; //max data length to start infinit scrall observer
const itemsLength = 20;

const DropdownSelect = forwardRef((
{
    data,
    type,
    title,
    isExpanded,
    seartchField = null,
    defaultSelected = null,
    selectedCounter = null,
    getSelectedHandler,
    updateExpandingState,
    searchHandler = null
}, ref) => {
    
    const [listData, setListData] =  useState([]);
    const [expanded, setExpanded] = useState(false);
    const [expandIsDisabled, setExpandIsDisabled] = useState(true);
    const [searchValue, setSearchValue] = useState("");

    const scrollRef = useRef();
    const loadingRef = useRef();
    
    //infinit scroll
    const addMoreItems = () => {
        //added Timeout only for loader testing
        setTimeout(() => {
          if (listData.length === data.length) {
            return;
          }
          let step = 0;
          if (listData.length + itemsLength < data.length) {
            step = listData.length + itemsLength;
          } else {
            step = data.length;
          }
    
          const tmpArr = data.slice(0, step);
          setListData(() => tmpArr);
        }, 500);
    };

    useEffect(() => {
        
        if(data?.length){
            // add infinite scroll (intersection observer) 
            //in case of data.length > 60
            if(data.length > maxDataLength){
                setListData(()=>[]);
                addMoreItems();
            }else{
                setListData([...data]);
            }
            
            setExpandIsDisabled(false);
            //setExpanded(true);
        }
    }, [data]);

    const loadMore = (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
        addMoreItems();
        }
    };
        
    useEffect(() => {
        if(data.length < maxDataLength) return;
        
        const options = {
          root: scrollRef.current,
          rootMargin: "25px",
          threshold: 0.25
        };
    
        const observer = new IntersectionObserver(loadMore, options);
    
        if (loadingRef.current) {
          observer.observe(loadingRef.current);
        }
    
        return () => {
          if (loadingRef.current) {
            observer.unobserve(loadingRef.current);
          }
        };
    }, [scrollRef, loadingRef, loadMore]);

    useEffect(() => {
        setExpanded(isExpanded);
    }, [isExpanded]);

    useEffect(() => {
        if(type === "checkbox"){
            searchHandler(searchValue); 
        }
    },[searchValue]);

    useEffect(() => {
        if(expanded){
            updateExpandingState(expanded, title); 
        }
    },[expanded]);

    const onSearchFieldChange = (e) => {
        e.preventDefault();
        const _value = e.target.value.trim().toLowerCase()
        setSearchValue(_value);
    }

    const dropdownToggle = (e) => {
        //e.preventDefault();
        if(expandIsDisabled) return;
        setExpanded(prev => !prev);
    }
    
    const renderTitle = () => {
        let titleElmnt = <Title>{`select ${title}`}</Title>;
        if(selectedCounter && selectedCounter > 0 && type === "checkbox"){
            titleElmnt = <Title>{`${selectedCounter} users selected`}</Title>;
        }else if(defaultSelected?.length){
            titleElmnt = <Title>{`${defaultSelected} selected`}</Title>;
        }
        return titleElmnt;
    }

    return (
        <Container title={title} ref={ref}>
        <Expander disabled={expandIsDisabled} expanded={expanded} onClick={dropdownToggle}>
                {
                    renderTitle()
                }
            <div className="expand-btn"   >
                <FontAwesomeIcon icon={faChevronUp} color={expandIsDisabled ? 'var(--disabled-color)' : 'var(--primary-color)'} size="1x" rotation={expanded ? 0 : 180} />
            </div>
        </Expander>
        <DropdownContent expanded={expanded} ref={scrollRef}>
        {seartchField && 
            <SearchFieldContainer>
                <input 
                    type="text" 
                    placeholder="Search by user name"
                    value={searchValue}
                    onChange={onSearchFieldChange}
                />
                <FontAwesomeIcon icon={faSearch} color='var(--primary-color)' size="1x"/>
            </SearchFieldContainer>
        }
        {
            listData?.length > 0 &&
            listData.map((item) => (
                <SelectionItem 
                key={item.id} 
                type={type} 
                data={item}
                groupName={title}
                defaultSelected={
                    defaultSelected ? 
                    defaultSelected === item.name :
                    item.hasOwnProperty('selected') &&
                    item.selected
                    }
                handler={getSelectedHandler}
                />
            ))
          }
          {listData.length < data.length && (
            <Loader ref={loadingRef}>
                loading...
            </Loader>
          )}
          </DropdownContent>
      </Container>
    )
})

export default React.memo(DropdownSelect)
