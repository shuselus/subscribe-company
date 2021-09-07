import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import styled from 'styled-components'
import { colormap } from '../../colormap'
//import FormWrupper from  './FormWrupper'
import DropdownSelect from './DropdownSelect'
//import PropTypes from 'prop-types'

const Container = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start
    color: ${colormap.primaryTxtColor};
`;

const Companies = ({data}) => {
    const {selectedCompany} = useSelector(state => state.appDataReducer)
    console.log("Companies>>>>", data);

    const getSelectedData = (data) => {
       console.log("getSelectedData>>>>", data)
    }

    return (
        <Container>
            <DropdownSelect 
            data={data.organizations} 
            type="radio" 
            title="companies" 
            selectedCompany={selectedCompany}
            handler={getSelectedData}/>
        </Container>
    )
}

export default Companies
