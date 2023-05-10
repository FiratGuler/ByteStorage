import { Link, Route, Routes } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from "../Components/Header";
import AddTablePanel from '../Components/ProductsPanels/AddTableCard';
import { useEffect, useRef } from 'react'
import { Container, Row, Col, Button, Card, CardGroup } from 'react-bootstrap';
import { FolderFill, FolderMinus } from 'react-bootstrap-icons'
import { doc, deleteDoc } from "firebase/firestore";
import db from "../DbConnection"
import { useSite } from "../context/SiteContext"


export default function Products() {
  const { getTable, AllTables, setAllTables, tableSearch } = useSite()



  const getTableRef = useRef(getTable);
  useEffect(() => {
    getTableRef.current();
  }, [])


  const deleteTable = async (id) => {
    try {
      await deleteDoc(doc(db, "/Ana/admin1/Products", id));
      setAllTables(AllTables.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Row >

          <AddTablePanel />

        </Row>
        <Row className='mt-5 justify-content-center'>
          {AllTables.filter((table) => table.name.includes(tableSearch)).map((table) => (
            <Col key={table.id} xs={6} sm={6} lg={3} xl={3} style={{ color: "white" }}>
              <CardGroup>
                <Card className='border-0' style={{ width: '13rem', backgroundColor: "#212529", alignItems: "center" }}>
                  <FolderFill style={{ fontSize: "50px" }} />
                  <Card.Body>
                    <Link style={{ textDecoration: "none", color: "tomato" }} to={`/table/${table.id}`}>
                      <Card.Body>{table.name} </Card.Body>
                    </Link>
                    <Button variant='dark' className='float-end' onClick={() => deleteTable(table.id)}><FolderMinus /></Button>
                  </Card.Body>
                </Card>
              </CardGroup>
            </Col>
          ))}
        </Row>
      </Container>


      <Footer />
      <Routes>
        <Route path="/table/:id" />
      </Routes>
    </>
  )
}
