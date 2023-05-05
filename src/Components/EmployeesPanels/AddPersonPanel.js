import AlertWindow from '../AlertWindow';
import { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap';
import db from "../../DbConnection"
import { doc, setDoc, collection } from "firebase/firestore";
import { useSite } from "../../context/SiteContext"

export default function AddPersonPanel(props) {

  const { getPerson, setAlert } = useSite()
  const [nameSurname, setNameSurname] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isAdmin, setIsAdmin] = useState(false);


  const AddSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(collection(db, "/Ana/admin1/personel")), {
        nameSurname: nameSurname,
        username: username,
        password: password,
        isAdmin: isAdmin,
      });

      setNameSurname("");
      setUsername("");
      setPassword("");
      setIsAdmin(false)
      getPerson()
      setAlert((prevAlert) => [{ ...prevAlert[0], alertIsActive: true, alertMessage: "successfully added staff !", situation: "success" },])


    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  return (
    <>
    <AlertWindow/>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Personnel
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>Name & Surname</Form.Label>
              <Form.Control type="text" placeholder="Enter Name and Surname" value={nameSurname} onChange={e => setNameSurname(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)} />
              <Form.Text className="text-muted">
                The user will log in with this username.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Should the admin be authorized?" checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={AddSubmit} >
              Submit
            </Button>
          </Form>
        </Modal.Body>

      </Modal>
    </>
  );
}
