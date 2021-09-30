import React from 'react'
import styled from 'styled-components'
import { NavLink  } from "react-router-dom";

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



const NavItem = ({name, route, exact = null}) => {
    const activeStyle={
        color: 'var(--acive-link-color)',
        textDecoration: 'underline'
    }

     
    return (
        <>
        <StyledNavLink to={route} exact activeStyle={activeStyle}>
            {name}
        </StyledNavLink>
        <StyledNavLink to={route} activeStyle={activeStyle}>
            {name}
        </StyledNavLink>
        </>
    )
}

export default NavItem
