import React from 'react'
import { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap';
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import {Trash3, PencilFill, PersonDash, PersonAdd } from 'react-bootstrap-icons'


export default function Personnel() {

  const [users, setUsers] = useState([])
  
  useEffect(() => {
    fetch("https://fakestoreapi.com/users")
      .then((res) => res.json()) // axios eklenirse json parse etmeye gerek yok 
      .then((data) => setUsers(data)) // axios ile gelen verinin içerisinden data alınması gerekiyor.
      .catch((e) => console.log(e))
  }, [])

  return (
    <>
     

      <Header />
      <Container >


        <div className='table-responsive'>
          <Table className='table-light ' striped bordered hover size='sm'>
            <thead >
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th onClick={()=>console.log("test")} style={{ textAlign: 'center', width: '123px' }}><PersonAdd className='Be_BTN' /></th>
              </tr>
            </thead>
            <tbody >
              {users.map((user) => (

                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name.firstname}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    <button className='BTN_icon'><Trash3 /></button>
                    <button className='BTN_icon'><PencilFill /></button>
                    <button className='BTN_icon'><PersonDash /></button>
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
