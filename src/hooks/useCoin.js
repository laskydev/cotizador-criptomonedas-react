import React, { useState } from 'react';
import styled from 'styled-components';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    font-size:2.4rem;
    margin-top: 2rem;
    display: block;
`

const Select = styled.select`
    width: 100%;
    display: block;
    padding:1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`

const useCoin = (label, initialState, options) =>{

    //State of custom hook
    const [state, setState] = useState(initialState)


    const SelectCoin = () =>{
        return (
        <>
            <Label>{label}</Label>
            <Select
                onChange={e => setState(e.target.value)}
                value={state}
            >
                <option>---Seleccione---</option>
                {options.map(option=>(
                    <option 
                    key={option.id}
                    value={option.id}
                    >{option.name}</option>
                ))}
            </Select>
        </>
        )
    }

    //Return state, ui and state modfiying function
    return [state, SelectCoin, setState]

}

export default useCoin;