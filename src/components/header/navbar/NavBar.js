import React from 'react'
import styled from 'styled-components'
import { colormap } from '../../../colormap'
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

const NavBar = () => {
    return (
        <NavBarContainer>
            <NavItem name="Home" route="home"/>
            <NavItem name="Companies" route="companies"/>
        </NavBarContainer>
    )
}

export default NavBar