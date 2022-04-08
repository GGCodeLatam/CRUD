import React from 'react'
import { Card, ListGroup, ListGroupItem, Container } from 'react-bootstrap'
import './styles/styles.css'
import axios from 'axios'
import Swal from 'sweetalert2'

const CardMotorcycle = ({motorcycle, setUpdateList, updateList, handleOpenModal,setDataModal}) => {

  const URL = 'http://localhost:3004/motorcycles'

  const handleEdit = async () => {
    handleOpenModal();
    setDataModal(motorcycle);
  }

  const handleDelete = async () => {

    Swal.fire({
      title: `Estas seguro de eliminar la publicación ${motorcycle.reference} ?`,
      text: 'Esta acción es permanente',
      icon: 'warning',
      showCancelButton: true,
      confirmButton: '#3085d6',
      cancelButton: '#d33',
      confirmButtonText: 'Si, quiero eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${URL}/${motorcycle.id}`).then((response) => {
          console.log(response)
          if (response.status === 200) {
            Swal.fire(
              'Eliminado!',
              `se elimino con exito la publicación ${motorcycle.reference}`,
              'success'
            )
            setUpdateList(!updateList)
          } else {
            Swal.fire(
              'Error!',
              'Hubo un problema al eliminar la publicación',
              'error'
            )
          }
        })
      }
    })
  }



  return (
    <div className="col-4 mb-3">
        <Card>
            <Container className="image-relleno">
            <Card.Title className="text-center">{motorcycle.reference}</Card.Title>
            <img src={motorcycle.image} alt={motorcycle.reference} className="card-img-top image-card" />
            </Container>
            <Card.Body>
                <ListGroup>
                    <ListGroupItem><strong>MODELO: </strong>{motorcycle.model}</ListGroupItem>
                    <ListGroupItem><strong>MARCA: </strong>{motorcycle.trademark}</ListGroupItem>
                    <ListGroupItem><strong>PRECIO: </strong>{motorcycle.price}</ListGroupItem>
                </ListGroup>
                <button className="btn btn-danger me-2 mt-2" onClick={handleDelete}>Eliminar</button>
                <button className="btn btn-primary me-2 mt-2" onClick={handleEdit}>Editar</button>
            </Card.Body>
        </Card>
    </div>
  )
}

export default CardMotorcycle