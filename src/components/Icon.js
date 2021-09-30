import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Icon = ({iconStyle, iconName, ...rest})=> {
  //const { iconStyle, iconName } = props;
  console.log('Icon>>>>', iconName)
  const { size, rotation, spin, border, pull, flip } = rest;  

  return (
    <div>
      <FontAwesomeIcon icon={['fab', iconName.toLowerCase()]} 
            size = {size} rotation={rotation} spin={spin} border={border} pull={pull} flip={flip}  />
    </div>
  );
};