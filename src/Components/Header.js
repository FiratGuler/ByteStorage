import { Nav } from 'react-bootstrap'
import { BoxArrowLeft,House } from 'react-bootstrap-icons'
import { LinkContainer } from 'react-router-bootstrap';
import { useSite } from "../context/SiteContext"


export default function Header() {



    const { adminCheck, setAdminCheck } = useSite()


    return (
        <>
            <Nav className='p-5 justify-content-center header' as="ul">
                <Nav.Item as="li">
                    <LinkContainer to="/MainPage">
                        <Nav.Link><House/></Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item as="li">
                    {adminCheck ?
                        <LinkContainer to="/personnels">
                            <Nav.Link>Employees</Nav.Link>
                        </LinkContainer>
                        : ""}
                </Nav.Item>
                <Nav.Item as="li">
                    <LinkContainer to="/products">
                        <Nav.Link>Products</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item as="li" >
                    <LinkContainer to="/">
                        <Nav.Link onClick={() => setAdminCheck(false)}><BoxArrowLeft /></Nav.Link>
                    </LinkContainer>
                </Nav.Item>
            </Nav>


        </>
    );
}
