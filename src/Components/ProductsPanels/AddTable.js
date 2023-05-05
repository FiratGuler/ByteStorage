import { useState } from 'react'
import {  Form, Button, Container, Row, Col } from 'react-bootstrap';
import db from "../../DbConnection"
import {  collection,  addDoc } from "firebase/firestore";
import { useSite } from '../../context/SiteContext';



export default function AddTablePanel(props) {

    const { getTable } = useSite()
    const [tableName, setTableName] = useState("")


    const addNewTable = async (e) => {
        e.preventDefault()
        try {
          await addDoc(collection(db, "Ana", "admin1", "Products"), {
                name: tableName,
         
            });
            setTableName("")
            getTable()
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }



    return (
        <Container>

            <Row>

                <Col md={{ span: 3, offset: 3 }} >
                    <Form>

                        <Form.Label>Table Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Table Name" value={tableName} onChange={(e) => setTableName(e.target.value)} />
                        <Button variant="primary" type="submit" onClick={addNewTable}>
                            Add Table
                        </Button>

                    </Form>
                </Col>

            </Row>
        </Container>

    )
}
