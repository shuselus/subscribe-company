import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
    margin: 0 12px;
    color: var(--link-color);
    border: none;
    text-align: center;
    height: inherit;
    &:hover{
        color: var(--hover-link-color);
    }
    &:active{
        color: var(--hover-link-color);
        border-bottom: var(--secondary-color);
    }
`;

const NavItem = ({name, route}) => {
    return (
        <StyledLink to={route}>
            {name}
        </StyledLink>
    )
}

export default NavItem
