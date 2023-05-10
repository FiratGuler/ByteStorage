import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { XLg } from 'react-bootstrap-icons';
import { useParams, useNavigate } from 'react-router-dom';
import { useSite } from '../../context/SiteContext';
import ExcelImport from './ExcelImport';
import { DashSquare } from 'react-bootstrap-icons';
import { doc, updateDoc } from "firebase/firestore";
import db from '../../DbConnection';


export default function ProductTable() {
  const historyPage = useNavigate();
  const { id } = useParams();
  const { AllTables, setExcelTable } = useSite();
  const [localTable, setLocalTable] = useState({});



  useEffect(() => {
    setLocalTable(AllTables.find((e) => e.id === id));
  }, [id, AllTables]);



  const handleDeleteRow = (rowIndex) => {
    const updatedTable = {
      ...localTable,
      excel: localTable.excel.filter((row, index) => index !== rowIndex),
    };
    const tableRef = doc(db, "Ana", "admin1", "Products", id);
    updateDoc(tableRef, updatedTable);
    setLocalTable(updatedTable);
    setExcelTable(updatedTable)

  };





  return (
    <>

      <Container className="pt-5">

        <Row>
          <Col>

          </Col>
          <Col></Col>
          <Col>
            <XLg style={{ color: 'red', fontSize: '35px', float: 'right', marginBottom: "40px" }} onClick={() => historyPage('/products')} />
          </Col>
        </Row>

        <Row>
          {localTable.excel ? (
            <Table striped bordered hover variant="light">
              <thead>
                <tr>
                  {Object.keys(localTable.excel[0])
                    .sort()
                    .map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  <th style={{ textAlign: 'center', width: '123px' }}>action</th>
                </tr>
              </thead>
              <tbody>
                {localTable?.excel?.map((row, index) => (
                  <tr key={row.id || row._id || index}>
                    {Object.entries(row)
                      .sort(([key1], [key2]) => key1.localeCompare(key2))
                      .map(([key, value], index) => (
                        <td key={key}>{value}</td>
                      ))}
                    <td key="actions">
                      <button className="BTN_icon" onClick={() => handleDeleteRow(index)}>
                        <DashSquare />
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <ExcelImport />
          )}
        </Row>

        <Footer />
      </Container>
    </>
  );
}
