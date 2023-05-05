import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { XLg } from 'react-bootstrap-icons';
import db from '../../DbConnection';
import { doc, setDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function CreateCategory(props) {
    const { id } = useParams();
    const [inputs, setInputs] = useState([{ id: uuidv4(), value: '' }]);
    const docRef = doc(db, 'Ana', 'admin1', 'Products', id);

    const handleAddInput = () => {
        setInputs([...inputs, { id: uuidv4(), value: '' }]);
    };

    const handleInputChange = (e, id) => {
        e.preventDefault();
        const newInputs = [...inputs];
        const index = newInputs.findIndex((input) => input.id === id);
        newInputs[index].value = e.target.value;
        setInputs(newInputs);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fields = {};
        inputs.forEach((input) => {
            fields[input.value] = '';
        });
        setDoc(docRef, fields, { merge: true })
            .then(() => console.log(`Fields added successfully!`))
            .catch((error) => console.error(`Error adding fields:`, error));
        props.onHide();
    };

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h2>Edit Personnel Panel</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        <Col>
                            <Button variant='dark' onClick={handleAddInput}>Add Category Field</Button>
                        </Col>

                        {inputs.map((input) => (

                            <Form className="row g-3" key={input.id}>
                                <Form.Group className="col mb- ">

                                    <Form.Control
                                        type="text"
                                        value={input.value}
                                        onChange={(e) => handleInputChange(e, input.id)}
                                    />
                                </Form.Group>
                                <Form.Group className="col-auto" >
                                    <Button variant='danger' onClick={() => {
                                        const newInputs = inputs.filter((i) => i.id !== input.id);
                                        setInputs(newInputs);
                                    }}><XLg/></Button>
                                </Form.Group>
                            </Form>

                        ))}
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='dark' onClick={handleSubmit}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
