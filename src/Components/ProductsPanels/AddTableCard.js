import { useState } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap';
import db from "../../DbConnection"
import { collection, addDoc } from "firebase/firestore";
import { useSite } from '../../context/SiteContext';



export default function AddTablePanel(props) {

    const { getTable, setTableSearch } = useSite()
    const [tableName, setTableName] = useState("")


    const addNewTable = async (e) => {
        e.preventDefault()
        try {
            await addDoc(collection(db, "Ana", "admin1", "Products"), {
                name: tableName,

            });
            setTableName("")
            setTableSearch("")
            getTable()
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }



    return (
        <Row className="justify-content-center">
            <Col md={{ span: 6 }} className="text-right" >
                <Form >
                 
                    <Form.Group className='d-flex align-items-center'>

                        <Form.Control type="text" placeholder="Search or Add Table Name" value={tableName} onChange={(e) => { setTableName(e.target.value); setTableSearch(e.target.value) }} className="me-2" />

                    </Form.Group>
                    <Form.Group className='float-end mt-2'>

                        <Button variant="danger" type="submit" onClick={addNewTable} >
                            Add Table
                        </Button>

                    </Form.Group>

                </Form>
            </Col>
        </Row >

    )
}
