import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardMotorcycle from './CardMotorcycle';
import { Container, Row, Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2'

const ListMotorcycles = () => {

    const URL = 'http://localhost:3004/motorcycles'
    
    const getData = async () => {
        const response = axios.get(URL);
        return response;
    }


    const [list, setList] = useState([])
    const [updateList, setUpdateList] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [dataModal, setDataModal] = useState({})

    const handleCloseModal = () => {setShowModal(false)}
    const handleOpenModal = () => {setShowModal(true)}
    const handleChangeModal = ({target}) => {
        setDataModal({
            ...dataModal,
            [target.name]: target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.put(`${URL}/${dataModal.id}`, dataModal);
        if (response.status === 200) {
            Swal.fire(
                'Guardado!',
                `El registro ${response.data.reference} ha sido guardado exitosamente!`,
                'success'
            )
            handleCloseModal()
            setUpdateList(!updateList)
        } else {
            Swal.fire(
                'Error!',
                'Hubo un problema al actualizar la publicación :( ',
                'error'
            )
        }
    }

    useEffect(() => {
       getData().then((response) => {
           setList(response.data)
       })
    }, [updateList]);

  return (
    <Container className="m-5 mb-5">
        <Row>
        {
            list.map((motorcycle, index) => (
                <CardMotorcycle
                    key={index}
                    motorcycle={motorcycle}
                    setUpdateList={setUpdateList}
                    updateList={updateList}
                    handleCloseModal={handleCloseModal}
                    handleOpenModal= {handleOpenModal}
                    setDataModal = {setDataModal}
                />
            ))
        }
        </Row>

        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header>
                <Modal.Title>Actualizar Datos</Modal.Title>
            </Modal.Header>
            <Form
                onSubmit = {handleSubmit}
            >
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Referencia</Form.Label>
                    <Form.Control
                        className="mb-3"
                        type="text"
                        name="reference"
                        placeholder="Referencia"
                        value={dataModal.reference}
                        onChange={handleChangeModal}
                        />
                     <Form.Group className="mb-3">
                    <Form.Control 
                        type="text"
                        name="model"
                        placeholder="Modelo"
                        value={dataModal.model}
                        onChange={handleChangeModal}
                        required
                    />
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Control 
                        type="number"
                        name="price"
                        placeholder="Precio"
                        value={dataModal.price}
                        onChange={handleChangeModal}
                        required
                    />
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Control 
                        type="text"
                        name="image"
                        placeholder="URL de la imagen"
                        value={dataModal.image}
                        onChange={handleChangeModal}
                        required
                    />
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <select className="form-control"
                        name="trademark"
                        onChange={handleChangeModal}
                        required


                    >
                    <option value={dataModal.trademark}>{dataModal.trademark}</option>
                    <option value="YAMAHA">Yamaha</option>
                    <option value="SUSUKI">Susuki</option>
                    <option value="HONDA">Honda</option>
                    </select>
                    </Form.Group>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant = 'secondary' type='reset' onClick={handleCloseModal}>Cerrar</Button>
                <Button variant = 'primary' type='submit'>Guardar Cambios</Button>
            </Modal.Footer>
            </Form>
        </Modal>

    </Container>
  )
}

export default ListMotorcycles