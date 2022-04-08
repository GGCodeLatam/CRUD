import React, {useState} from 'react'
import { Container, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const NewMotorcycles = () => {

  const history = useHistory();

  const [data, setData] = useState({trademark: "", model: "", reference: "", price: "", image: "",});

  const handleChange = ({target}) => {
    setData({
      ...data,
      [target.name]: target.value
    })
  }

  const URL = "http://localhost:3004/motorcycles"

  const handleSubmit= async (e) => {
    e.preventDefault()
    const response = await axios.post(URL,data);
    if (response.status === 201) {
      Swal.fire(
        'Good job!',
        `La publicación ${response.data.reference} se ha realizado exitosamente!`,
        'success'
      )
      history.push('/')
    } else {
      Swal.fire(
        'Error!',
        'Hubo un problema al crear la publicación!',
        'error'
      )
    }
  }

  return (
    <Container>
      <h1 className="text-center">Nueva moto</h1>
      <Form
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3">
          <Form.Control 
            type="text"
            name="reference"
            placeholder="Referencia"
            value={data.reference}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control 
            type="text"
            name="model"
            placeholder="Modelo"
            value={data.model}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control 
            type="number"
            name="price"
            placeholder="Precio"
            value={data.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control 
            type="text"
            name="image"
            placeholder="URL de la imagen"
            value={data.img}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <select className="form-control"
            name="trademark"
            onChange={handleChange}
          >
          <option value="">Seleccione una marca</option>
          <option value="YAMAHA">Yamaha</option>
          <option value="SUSUKI">Susuki</option>
          <option value="HONDA">Honda</option>
          </select>
        </Form.Group>
        <button className="btn btn-success">Guardar</button>
      </Form>
    </Container>
  )
}

export default NewMotorcycles