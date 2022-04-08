import React from 'react'
import { Container } from 'react-bootstrap'
import ListMotorcycles from '../components/ListMotorcycles'

const App = () => {
  return (
    <Container fluid>
        <h1 className="text-center">Listado de motos</h1>
        <ListMotorcycles></ListMotorcycles>
    </Container>
  )
}

export default App