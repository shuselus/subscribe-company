import React, {useState} from 'react'
import useToggle from '../../hooks/useToggle'
import styled from 'styled-components'
import ActionButton from '../ActionButton'
import Modal from './Modal'

const ContentContainer = styled.div`
    padding: 40px 30px;
    width: 50%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--primary-bg-color);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const Organizations = ({data}) => {
    const [showModal, setShowModal] = useState(false);
    console.log("Companies>>>>", data);  
    
    return (
        <>
            <ContentContainer className="OrganizationssContentContainer">
                <ActionButton label={"SUBSCRIBE"} style={{fontSize: '1.5em'}} handler={() => setShowModal(true)}/>
            </ContentContainer>
            {
                showModal && <Modal displayModal={showModal} closeModal={() => setShowModal(false)}/>
            }
      </>
    )
}

export default Organizations
