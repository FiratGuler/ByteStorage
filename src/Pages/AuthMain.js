import React, { useEffect, useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function AuthMain() {

  const [nick, setNick] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem('who', JSON.stringify(nick))
  }, [nick])

  // const loginhandle = () => {
  //   if (nick === "admin") {
  //     navigate('/admin')
  //   }
  //   else if (nick === "user") {
  //     navigate('/user')
  //   }
  // }

  return (
    <Container className='min-vh-100 d-flex justify-content-center align-items-center'>
      

       
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => setNick(e.target.value === "admin" ? "admin" : "user")} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
              <Button variant="btn btn-outline-light" className='BTN' type="submit" onClick={()=>navigate("MainPage")}>
                Log In
              </Button>
            </div>
          </Form>
        

      
    </Container>
  )
}
