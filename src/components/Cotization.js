import React from 'react';
import styled from 'styled-components';

const DivResult = styled.div`
    color: white;
    font-family: Arial, Helvetica, sans-serif;

    p span{ 
        font-weight: bold;
    }
`

const Info = styled.p`
    font-size: 18px;
`

const Price = styled.p`
    font-size: 50px;
`

const Cotization = ({price}) => {
    if(Object.keys(price).length === 0) return null
    return ( 
        <DivResult>
            <Price>El precio es: <span>{price.PRICE}</span></Price>
            <Info>Precio más alto del día: <span>{price.HIGHDAY}</span></Info>
            <Info>El precio más bajo del día: <span>{price.LOWDAY}</span></Info>
            <Info>Variación en las últimas 24 horas <span>{price.CHANGEPCT24HOUR}</span></Info>
            <Info>última actualización <span>{price.LASTUPDATE}</span></Info>
        </DivResult>
    );
}

export default Cotization;