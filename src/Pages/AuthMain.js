import AlertWindow from "../Components/AlertWindow";
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSite } from "../context/SiteContext"


export default function AuthMain() {

  const navigate = useNavigate();
  const { Employees, setAdminCheck, setAlert } = useSite()





  const handleSubmit = async (e) => {
    e.preventDefault();
    const Username = e.target.Username.value;
    const password = e.target.password.value;

    const employee = Employees.find((data) => data.username === Username && data.password === password);

    if (employee) {
      await navigate('/MainPage', { replace: true });
      if (employee.isAdmin === true) {
        setAdminCheck(true)
      }
    } else {
      setAlert((prevAlert) => [{ ...prevAlert[0], alertIsActive: true, alertMessage: "Username or Password wrong", situation: "danger" },])
    }
  };

  console.log()

  return (<>
    <AlertWindow />

    <Container className="min-vh-100 d-flex justify-content-center align-items-center relative">


      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 mail" controlId="formBasicEmail">
          <Form.Label style={{ color: 'tomato' }}>Username</Form.Label>
          <Form.Control type="text" name="Username" placeholder="Enter Username" />
          <Form.Text className="text-muted">
            If you are having problems,contact your manager.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{ color: 'tomato' }}>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" />
        </Form.Group>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <Button variant="btn btn-outline-light" className="BTN" type="submit">
            Log In
          </Button>
        </div>
      </Form>



    </Container>

  </>
  );
}
