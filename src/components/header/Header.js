import {useState, useEffect} from 'react'
import Logo from './Logo'
import NavBar from './navbar/NavBar'
import styled from 'styled-components'
import { colormap } from '../../colormap'

const HeaderContainer = styled.header`
    width: 100%;
    height: 120px;
    position: relative;
    display: fixed;
    top: 0;
    z-index: 3;
    color: ${colormap.secondaryTxtColor};
    margin: 0 auto;
    background-color: ${colormap.headerBgColor};
`;
const InnerContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .centered{
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
        width: 50%;
        height: inherit;
    }
    .radio__input {
        input {
          opacity: 0;
          width: 0;
          height: 0;
        }
      }
`;
const Title = styled.h3`
   
`;

const Header = ({selectedCompany}) => {
    if(!selectedCompany) return(null);
    if(selectedCompany && Object.entries(selectedCompany).length === 0) return(null);
    return (
        <HeaderContainer>
            <InnerContainer>
            <img className="header-image" alt="Cycode" src="https://cycode.com/wp-content/uploads/2020/10/Cycode_logo.svg" title="Cycode"/>
                 
            {
                selectedCompany && 
                <div className="centered">  
                    <Logo iconName={selectedCompany.name}/> 
                    <Title>{selectedCompany.name}</Title>
                    <NavBar />
                </div>
                
            }           
               
            
            </InnerContainer>
           
        </HeaderContainer>
    )
}

// Header.propTypes = {

// }

export default Header
