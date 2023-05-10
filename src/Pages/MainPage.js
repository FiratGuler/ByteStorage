import AdminMessage from '../Components/MainPanel/AdminMessage'
import LiveWeather from '../Components/MainPanel/LiveWeather'
import LiveExchange from "../Components/MainPanel/LiveExchange"
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import { Container, Row, Col } from 'react-bootstrap'



export default function AdminPage() {



  return (
    <>
      <Header />
      <Container style={{ color: 'white' }}>

        <Row>
          <Col className='float-start align-self-center'>
            <h3> Welcome {localStorage.getItem('name')} </h3>
          </Col>
          <Col className='pt-4'>
            <LiveExchange />
          </Col>
          <Col>
            <LiveWeather />
          </Col>
        </Row>

        <Row>
          <Col style={{ color: 'black' }} >
            <AdminMessage />
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  )
}
