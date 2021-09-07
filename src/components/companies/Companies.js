import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {selectedCompanyName} from '../../actions/appActions'
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
    align-items: flex-start;
    justify-content: center;
    color: ${colormap.primaryTxtColor};
`;

const Companies = ({data}) => {
    const {selectedCompany} = useSelector(state => state.appDataReducer);
    const dispatch = useDispatch();
    console.log("Companies>>>>", data);

    const getSelectedData = (companyName) => {
       console.log("getSelectedData>>>>", companyName);
       dispatch(selectedCompanyName(companyName));
    }

    return (
        <Container>
            <DropdownSelect 
            data={data.organizations} 
            type="radio" 
            title="company" 
            selectedCompany={selectedCompany}
            handler={getSelectedData}/>
        </Container>
    )
}

export default Companies
