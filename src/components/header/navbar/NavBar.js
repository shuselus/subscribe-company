import React from 'react'
import { NavLink  } from "react-router-dom";
import styled from 'styled-components'
import NavItem from './NavItem'

const NavBarContainer = styled.nav`
    width: 25%; 
    display: grid;
    grid-template-columns: repeat( auto-fit, minmax(100px, 120px) );
    grid-template-rows: 60px;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto';
    font-weight: 600
`;

const StyledNavLink = styled(NavLink)`
 
    margin: 0 12px;
    color: var(--inactive-link-color);
    border: none;
    text-align: center;
    height: inherit;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
   
    &:hover {
        transition: all 0.2s ease-in-out;
        color: 'var(--hover-link-color)',
        textDecoration: 'underline'
    }
    
`;

const activeStyle={
    color: 'var(--acive-link-color)',
    textDecoration: 'underline'
}
const NavBar = () => {
    return (
        <NavBarContainer>
            <StyledNavLink exact to="/" activeStyle={activeStyle}>
              Home
            </StyledNavLink>
            <StyledNavLink to="/organizations" activeStyle={activeStyle}>
                Organizations
            </StyledNavLink>
        </NavBarContainer>
    )
}

export default NavBar
