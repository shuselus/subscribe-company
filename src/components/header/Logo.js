import * as React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab} from '@fortawesome/free-brands-svg-icons'
import { Icon } from "../Icon"

library.add(fab);

/*
[
    {
        "name": "Google",
        "id": "5d366f1a-6161-4144-85e0-15f67fd74211"
    },
    {
        "name": "Microsoft",
        "id": "4814b199-dfd8-4e41-aa12-30a4cf542bf6"
    },
    {
        "name": "Amazon",
        "id": "622bb0f2-0ac3-4f3c-bf84-a91eab7881b5"
    },
    {
        "name": "Intel",
        "id": "a0bf60e8-249d-4c98-9725-580fdee65ba4"
    },
    {
        "name": "Check Point",
        "id": "40f9fae0-6199-49db-aeb5-19860a7e3c6f"
    },
    {
        "name": "Wix",
        "id": "c53b2b4a-1964-43f2-8b0e-217b3f3d30ef"
    },
    {
        "name": "IBM",
        "id": "571fbffa-6c0f-4dcb-87b7-c12b41f3db5f"
    }
]
*/

const Logo = ({iconName}) => {
    return(
       <Icon iconStyle={fab} iconName={iconName} color="#4081ec" size="3x" border={false}/> 
    )
    
}

export default Logo
