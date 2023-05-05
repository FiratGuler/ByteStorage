import React, { useEffect, useState } from 'react'
import { Modal, Form, Button, Table } from 'react-bootstrap';
import { useSite } from "../../context/SiteContext"
import db from "../../DbConnection"
import { doc, updateDoc } from "firebase/firestore";


export default function EditPersonPanel(props) {
    
    const { Employees, editID,setAlert,getPerson } = useSite()

    const [nameSurname, setNameSurname] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    useEffect(() => {

   
        Employees.filter((user) => user.id === editID).map((data) => {
            setNameSurname(data.nameSurname);
            setUsername(data.username);
            setPassword(data.password);
            return null;
        });

    }, [Employees, editID])



    const EditSubmit = async (e) => {
        e.preventDefault();
        try {
            const personRef = doc(db, "Ana", "admin1", "personel", editID);
            await updateDoc(personRef, {
                nameSurname: nameSurname,
                username: username,
                password: password,
            });
            await getPerson()
            setAlert((prevAlert) => [{ ...prevAlert[0], alertIsActive: true, alertMessage: "Edited employee !", situation: "warning" },])
        } catch (error) {
            setAlert((prevAlert) => [{ ...prevAlert[0], alertIsActive: true, alertMessage: "There's been a problem!", situation: "danger" },])
        }
    };

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h2>Edit Personnel Panel</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <h4>Preview</h4>

                <Table className='table-light ' striped bordered hover size='sm'>

                    <thead >
                        <tr>
                            <th>Name & Surname</th>
                            <th>Username</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr>
                            <td>{nameSurname}</td>
                            <td>{username}</td>
                            <td>{password}</td>
                        </tr>
                    </tbody>
                </Table>


                <Form className='row'>
                    <Form.Group className="col" >
                        <Form.Label>Name and Surname</Form.Label>
                        <Form.Control type="text" value={nameSurname} onChange={e => setNameSurname(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="col">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="text" value={password} onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button className='btn btn-dark' type="submit" onClick={EditSubmit} >
                        Edit Confirm
                    </Button>
                </Form>
            </Modal.Body>

        </Modal>
    )
}
