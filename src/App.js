import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Form from './components/Form';
import image from './cryptomonedas.png'
import axios from 'axios'
import Cotization from './components/Cotization';
import Spinner from './components/Spinner';
const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Image = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color:#fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after{
    content:'';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`
function App() {

  const [coin, setCoin] = useState('');
  const [crypto, setCrypto] = useState('');
  const [price, setPrice] = useState('');
  const [load, setLoad] = useState(false)

  useEffect(() =>{
    
    const quoteCurrency = async () =>{
      //Prevent first implementation
      if(coin === '') return;
    
      //Call to API to get price
      const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${coin}`

      const result = await axios.get(URL)

      //Show the Spinner
      setLoad(true)

      //Hidden the spinner and show the price
      setTimeout(()=>{
        //Change state load
        setLoad(false)

        //Save price
        setPrice(result.data.DISPLAY[crypto][coin])
      },3000)
    }

    quoteCurrency()

  },[coin, crypto])

  //Show spinner or price

  const component = (load) ? <Spinner/> : <Cotization price={price}/>

  return (
    <Container>
      <div>
        <Image 
        src={image}
        alt='Imagen crypto'
        />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>
        <Form
          setCoin={setCoin}
          setCrypto={setCrypto}
        />
        {component}
      </div>
    </Container>
  );
}

export default App;
