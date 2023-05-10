import { Container, Row, Col, Table } from 'react-bootstrap'
import { PersonDash, PersonAdd, Trash3, PencilFill, PlusSquare, FolderPlus } from 'react-bootstrap-icons'
export default function Footer() {
    return (
        <footer className="relative-bottom footer">
            <Container>
                <Row>
                    <Col>
                        <h4>Buttons Means</h4>
                        <Table className='table-dark'>
                            <tbody>
                                <tr>
                                    <td>
                                        <p><PersonDash /> Delete Person</p>
                                    </td>
                                    <td>
                                        <p><PersonAdd /> Add Person</p>
                                    </td>
                                    <td>
                                        <p><FolderPlus /> Add Product Table</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p><Trash3 /> Delete Product</p>
                                    </td>
                                    <td>
                                        <p><PlusSquare /> Add Product</p>
                                    </td>
                                    <td>

                                        <p><PencilFill /> Edit Product/Personnel</p>
                                    </td>
                                </tr>

                            </tbody>
                        </Table>

                    </Col>
                </Row>

            </Container>
        </footer >
    )
}
