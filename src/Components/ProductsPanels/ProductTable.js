import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import { Container, Table, Row, Col, Form, Button } from 'react-bootstrap';
import { XLg } from 'react-bootstrap-icons';
import { useParams, useNavigate } from 'react-router-dom';
import { useSite } from '../../context/SiteContext';
import CreateCategory from './CreateCategory';

export default function ProductTable() {
  const historyPage = useNavigate();
  const { id } = useParams();
  const { AllTables } = useSite();
  const [localTable, setLocalTable] = useState([]);
  const [categoryPanel, setCategoryPanel] = useState(false);

  useEffect(() => {
    setLocalTable(AllTables.filter((e) => e.id === id)[0]);
  }, [id, AllTables]);



  return (
    <Container className='pt-5'>
      <CreateCategory show={categoryPanel} onHide={() => setCategoryPanel(false)} />
      <Row>
        <Col>
          <Form style={{ display: '-webkit-inline-box' }}>
            <Button onClick={() => setCategoryPanel(true)}>Create Categories</Button>
          </Form>
        </Col>
        <Col></Col>
        <Col>
          <XLg
            style={{ color: 'red', fontSize: '35px', float: 'right' }}
            onClick={() => historyPage('/products')}
          />
        </Col>
      </Row>

      <Row className='mt-5'>
        <div style={{ color: "white" }}>

        </div>
      </Row>

      <Row className='mt-5'>

        <Table className='table-light' striped bordered hover size='sm'>
          <thead>
            <tr>
              {Object.keys(localTable).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.keys(localTable).map((key) => (
                <td key={key}>{localTable[key]}</td>
              ))}
            </tr>
          </tbody>
        </Table>







        {/* <Table className='table-light' striped bordered hover size='sm'>
          <thead >
            <tr>
              {Object.keys(localTable).map((key) => {
                return (
                  <th>{key}</th>
                );
              })}
            </tr>
            <tbody>
              <tr>
                {Object.keys(localTable).map((key) => {
                  return (
                    <td>{localTable[key]}</td>
                  );
                })}
              </tr>

            </tbody>
          </thead>
        </Table> */}
      </Row>
      <Footer />
    </Container>
  );
}
