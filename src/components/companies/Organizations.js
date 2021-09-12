import React, { useMemo, useCallback } from 'react'
import useToggle from '../../hooks/useToggle'
import styled from 'styled-components'
import ActionButton from '../ActionButton'
import Modal from './Modal'

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-txt-color);
`;
const ContentContainer = styled.div`
    position: absolute;
    display: flax;
    align-items: center;
    justify-items: center;
    top: 35%;
    left: 50%;
    transform: translate(-50%, 0); 
`;

const Organizations = ({data}) => {
    const [displayModal, setDisplayModal] = useToggle(false);
    console.log("Companies>>>>", data);  
    
    const modalComponent = useMemo(()=>{
        if(!data){
            return null;
        } 
      return <Modal data={data} displayModal={displayModal}/>
    },[data, displayModal]);

    const buttonHandler= useCallback(() => {
        setDisplayModal();
    },[displayModal]);
    
    return (
        <>
        <Container className="OrganizationsContainer">
            <ContentContainer className="OrganizationssContentContainer">
                <ActionButton label={"SUBSCRIBE"} style={{fontSize: '1.5em'}} handler={buttonHandler}/>
            </ContentContainer>
            <Modal data={data} displayModal={displayModal}/>
            {
             // modalComponent
            }
        </Container>
        
      </>
    )
}

export default React.memo(Organizations)
