import { useEffect, useState } from 'react'
import { Form, Container, Row, Col } from 'react-bootstrap';


export default function QuickStart() {
 
    const [products, setProducts] = useState([])
    const [searchValue, setSearchValue] = useState(Number)

 
    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json()) // axios eklenirse json parse etmeye gerek yok 
            .then((data) => setProducts(data)) // axios ile gelen verinin içerisinden data alınması gerekiyor.
            .catch((e) => console.log(e))
    }, [])

    return (
        <Container >

            <Row>
                <Col xs="5" lg="4">{/* Search TextBoxt*/}

                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Barcode Number</Form.Label>
                            <Form.Control placeholder="Exp:135413" type='number' onChange={(e) => setSearchValue(parseInt(e.target.value))} />
                            <Form.Text className="text-muted">
                                You can make a quick search
                            </Form.Text>
                        </Form.Group>
                       
                    </Form>
                </Col>
                <Col ></Col>
                <Col>
                    {products.filter(content => content.id === searchValue).map(filteredcontent => (
                <p key={filteredcontent.id}>
                     {filteredcontent.title} <br/> Price : {filteredcontent.price}
                </p>
                       
                      
                    ))}

                </Col>
            </Row>

        </Container>
    )
}
