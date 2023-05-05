import { useState } from 'react'
import { Nav } from 'react-bootstrap'
import QuickStart from './QuickStart'
import { Search, BoxArrowLeft } from 'react-bootstrap-icons'
import { LinkContainer } from 'react-router-bootstrap';
import { useSite } from "../context/SiteContext"


export default function Header() {


    const [open, setOpen] = useState(false)
    const { adminCheck, setAdminCheck } = useSite()

    return (
        <>
            <Nav className='p-5 justify-content-center header' as="ul">
                <Nav.Item as="li">

                    <Nav.Link onClick={() => setOpen(!open)}><Search /></Nav.Link>

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
                        <Nav.Link onClick={()=>setAdminCheck(false) }><BoxArrowLeft /></Nav.Link>
                    </LinkContainer>
                </Nav.Item>
            </Nav>
            {open ? <QuickStart /> : ""}

        </>
    );
}
