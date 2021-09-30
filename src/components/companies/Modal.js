import React, { useEffect, useRef } from 'react';
import useOutsideClick from "../../hooks/useOutsideClick";
import styled from 'styled-components';
import DropdownsWrupper from './DropdownsWrupper';



 //display: ${props=> props.displayModal ? 'block' : 'none'};

const ModalContainer = styled.div`
    opacity: ${props=> props.displayModal ? '1' : '0'};
    transform: ${props=> props.displayModal ? 'scale(1,1)' : 'scale(0,0)'};
    position: fixed;
    z-index: 5;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    overflow: auto;
    background-color: rgba(0,0,0,0.7);
    transition: all .3s ease-out;
    margin: auto 0
`;

const ModalContent = styled.div` {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 50%;
    height: 50%;
    min-height: 600px
`;

const CloseBtn = styled.span` {
    position: absolute;
    top: 20px;
    right: 20px;
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;  
    &:hover, :focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }
`;

const Modal = ({displayModal, closeModal}) => {
    const modalContentRef = useRef(null);
    const modalContainerRef = useRef(null);
    

    useOutsideClick([modalContentRef], ()=>{
        if(displayModal){
           closeModal();
        }
    });
    
    return (
        <ModalContainer className="ModalContainer" 
            displayModal={displayModal} 
            ref={modalContainerRef}>
            <ModalContent className="ModalContent" ref={modalContentRef}>
               <DropdownsWrupper />
               <CloseBtn onClick={closeModal}>&times;</CloseBtn>
            </ModalContent>
        </ModalContainer>
    )
}

export default Modal
