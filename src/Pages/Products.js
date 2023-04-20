import { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap';

import Footer from '../Components/Footer';
import Header from "../Components/Header";
import { Trash3, PencilFill, PlusSquare, FolderPlus, AlignCenter } from 'react-bootstrap-icons'

export default function Products() {

  const [products, setProducts] = useState([])
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json()) // axios eklenirse json parse etmeye gerek yok 
      .then((data) => setProducts(data)) // axios ile gelen verinin içerisinden data alınması gerekiyor.
      .catch((e) => console.log(e))
  }, [])


  return (
    <>
      <Header />
      <Container >

        <div className='AddTable'>

          <button className='BTN_icon'>Add Table <FolderPlus /></button>
        </div>
        <div className='table-responsive'>
          <Table className='table-light ' striped bordered hover size='sm'>
            <thead >
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th onClick={() => console.log("test")} style={{ textAlign: 'center', width: '85px' }}><PlusSquare style={{ fontSize: "25px", cursor: 'pointer', }} />
                </th>
              </tr>
            </thead>
            <tbody >
              {products.map((products) => (

                <tr key={products.id}>
                  <td>{products.id}</td>
                  <td>{products.title.substring(0, 9)}</td>
                  <td>{products.price}</td>
                  <td>{products.category}</td>
                  <td>
                    <button className='BTN_icon'><PencilFill /></button>
                    <button className='BTN_icon'><Trash3 /></button>

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
