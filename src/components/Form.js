import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useCoin from '../hooks/useCoin';
import useCrypto from '../hooks/useCrypto';
import axios from 'axios'
import Error from './Error';
const Button = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color:#66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;
    &:hover{
        background-color: #326AC0;
        cursor: pointer;
    }
`

const Form = ({setCoin, setCrypto}) => {

    //State of crypto list
    const [cryptoList, setCryptoList] = useState([])
    const [error, setError] = useState(false);


    const COINS = [
        {id: 'USD', name:'Dolar de USA'},
        {id: 'MXN', name:'Peso mexicano'},
        {id: 'EUR', name:'Euro'},
        {id: 'GDP', name:'Libra Esterlina'}

    ]

    //Using useMoneda
    const [coin, SelectCoin] = useCoin('Elige tu moneda!','', COINS);
    //Using useCrypto

    const[crypto, SelectCrypto] = useCrypto('Elige tu Critpomoneda', '', cryptoList)

    //Call to API
    useEffect(()=>{
        const callAPI = async () =>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            
            const result = await axios.get(url)
            setCryptoList(result.data.Data)
        }

        callAPI();
    },[])

    //When form on submit
    const quoteCurrency = e =>{
        e.preventDefault();

        //Validate if options are full
        if (coin === ''  || crypto === ''){
            setError(true)
            return
        }
        
        //Send the data to principal component
        setError(false)
        setCoin(coin)
        setCrypto(crypto)


    }

    return ( 
        <form
            onSubmit={quoteCurrency}
        >
            {error && <Error message="Todos los campos son obligatorios"/>}
            <SelectCoin/>
            <SelectCrypto/>
            <Button
                type="submit"
                value="Calcular"
            />
        </form>
    );
}

export default Form;