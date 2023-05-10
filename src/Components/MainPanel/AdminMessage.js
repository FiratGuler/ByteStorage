import React, { useState, useEffect } from 'react'
import db from '../../DbConnection'
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { Form, Button, Toast } from 'react-bootstrap';
import { useSite } from '../../context/SiteContext';


export default function AdminMessage() {

    const { adminCheck } = useSite()
    const [message, setMessage] = useState("")
    const [show, setShow] = useState(true)
    const [adminData, setAdminData] = useState([])
    const who = localStorage.getItem('username');

    useEffect(() => {
        const fetchAdminData = async () => {
            const collectionRef = collection(db, '/Ana/admin1/personel');
            const myQuery = query(collectionRef, where('isAdmin', '==', true));
            const snapshot = await getDocs(myQuery);
            setAdminData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchAdminData();
    }, []);

    const handleButtonClick = async () => {
        const collectionRef = collection(db, '/Ana/admin1/personel');
        const myQuery = query(collectionRef, where('isAdmin', '==', true));
        const querySnapshot = await getDocs(myQuery);

        querySnapshot.forEach(async (doc) => {
            try {
                const docRef = doc.ref; 
                await updateDoc(docRef, { message: ` There is a message from the ${who} :` + message });
                setMessage("")
            } catch (error) {
                console.error('Error updating document: ', error);
            }
        });


    }




    return (
        <>
            {adminCheck ? (
                <Toast onClose={() => setShow(false)} show={show}>
                    <Toast.Header>

                        <strong className="me-auto">Notification</strong>
                    </Toast.Header>
                    <Toast.Body>
                        {adminData?.map(e => (
                            <p key={e.id}>{e.message}</p>
                        ))}
                    </Toast.Body>
                </Toast>

            ) : (

                <Form >
                    <Form.Group style={{ width: 'auto', maxWidth: '500px' }} className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label style={{ color: "white" }}>You can send a message to your manager.</Form.Label>
                        <Form.Control as="textarea" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} />
                        <Button className='float-end mt-3' variant='secondary' onClick={() => handleButtonClick()}>Send</Button>
                    </Form.Group>
                </Form>
            )}

        </>
    )
}
