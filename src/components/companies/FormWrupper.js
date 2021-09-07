import React from 'react'
import styled from 'styled-components'
import { colormap } from '../../colormap'

const Container = styled.div`
    width: 100%;
    max-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;


const FormWrupper = ({data, name, getSelectedData}) => {
    console.log("FormWrupper>>>",data)
    const selectChange = (e) => {
        console.log(e.target.value);
        getSelectedData(e.target.value);
    }

    const createSelectEelement = () => { 
        return (
        <select name={name} placeholder={name} onChange={(e) => selectChange(e)}>
            {
            data.map(({name, id})=> 
            <option value={name} key={id}>{name}</option>)
            }
        </select>
        )
    }


    return (
        <Container>
            {
               createSelectEelement()  
            }
           
        </Container>
    )
}

export default FormWrupper
