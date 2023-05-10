import Header from '../Components/Header'
import Footer from '../Components/Footer'
import AddPersonPanel from '../Components/EmployeesPanels/AddPersonPanel';
import EditPersonPanel from '../Components/EmployeesPanels/EditPersonPanel';
import { useState } from 'react'
import { Container, Table, Form, InputGroup } from 'react-bootstrap';
import { PencilFill, PersonDash, PersonAdd, Check2,Search } from 'react-bootstrap-icons'
import db from "../DbConnection"
import { doc, deleteDoc } from "firebase/firestore";
import { useSite } from "../context/SiteContext"
import AlertWindow from '../Components/AlertWindow';


export default function Personnel() {
  const { Employees, setEmployees, getPerson, setEditID, setAlert } = useSite()
  const [addpanelShow, setAddPanelShow] = useState(false);
  const [editpanelShow, setEditPanelShow] = useState(false);
  const [searchInput, setSearchInput] = useState("")
  const deletePerson = async (id) => {
    try {
      await deleteDoc(doc(db, "/Ana/admin1/personel", id));
      setEmployees(Employees.filter((user) => user.id !== id));
      setAlert((prevAlert) => [{ ...prevAlert[0], alertIsActive: true, alertMessage: "Deleted employee !", situation: "warning" },])
      await getPerson();
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };
  const EditAction = (e) => {
    setEditPanelShow(true)
    setEditID(e)
  }

  return (
    <>
      <AlertWindow />
      <Header />
      <AddPersonPanel show={addpanelShow} onHide={() => setAddPanelShow(false)} />

      <EditPersonPanel show={editpanelShow} onHide={() => setEditPanelShow(false)} />
      <Container >
        <div className='table-responsive'>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1"><Search/></InputGroup.Text>
            <Form.Control placeholder='Enter Search Name' type='text' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
          </InputGroup>
       

          <Table className='table-light ' striped bordered hover size='sm'>

            <thead >
              <tr>
                <th style={{ width: '50px' }}>Admin</th>
                <th>Name & Surname</th>
                <th>Username</th>
                <th>Password</th>
                <th onClick={() => setAddPanelShow(true)} style={{ textAlign: 'center', width: '123px' }} ><PersonAdd className='Be_BTN' /></th>
              </tr>
            </thead>
            <tbody >

              {Employees.filter(table => table.nameSurname.toLowerCase().includes(searchInput)).map((user) => (

                <tr key={user.id}>
                  <td style={{ textAlignLast: 'center' }}>{user.isAdmin ? <Check2 /> : ""}</td>
                  <td>{user.nameSurname}</td>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td style={{ textAlignLast: 'center' }}>
                    <button className='BTN_icon' onClick={() => deletePerson(user.id)} ><PersonDash /></button>
                    <button className='BTN_icon' onClick={() => EditAction(user.id)}><PencilFill /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

      </Container>
      <Footer />

    </>
  )
}

