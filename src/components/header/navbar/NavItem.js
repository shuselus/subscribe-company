import React from 'react'
import styled from 'styled-components'
import { colormap } from '../../../colormap'

const NavItemContainer = styled.a`
    margin: 0 12px;
    color: ${colormap.linkColor};
    border: none;
    text-align: center;
    height: inherit;
    &:hover{
        color: ${colormap.hoverLinkColor};
    }
    &:active{
        color: ${colormap.hoverLinkColor};
        border-bottom:  ${colormap.secondaryColor};
    }
`;

const NavItem = ({name, route}) => {
    return (
        <NavItemContainer href={route}>
            {name}
        </NavItemContainer>
    )
}

export default NavItem
