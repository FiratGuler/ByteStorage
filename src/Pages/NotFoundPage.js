import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { House } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
const NotFoundPage = () => {


  const history = useNavigate();

  const handleClick = () => {
    history('/mainpage');
  };

  return (
    <Container className="text-center NotFound" style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      color:"White"
    }}>
      <Row>
        <Col>
          <h1>404 - Not Found Page</h1>
          <p>Sorry, your search page could not be found.</p>
          <House onClick={handleClick}/>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
