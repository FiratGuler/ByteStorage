import React, { useEffect, useState } from 'react'
import { Nav, NavLink } from 'react-bootstrap'
import QuickStart from './QuickStart'
import { Search,BoxArrowLeft } from 'react-bootstrap-icons'

export default function Header() {

    const [nick, setNick] = useState()
    const [open, setOpen] = useState(false)
    useEffect(() => {
        const item = JSON.parse(localStorage.getItem('who'))
        if (item) setNick(item)
    }, [])
    console.log(open)
    return (
        <>
            <Nav className='p-5 justify-content-center header' as="ul">

                <Nav.Item as="li">
                    <NavLink onClick={() => setOpen(!open)}><Search/></NavLink>
                </Nav.Item>
                <Nav.Item as="li">
                    {nick === "admin" ? <Nav.Link href="personnels">Employees </Nav.Link> : ""}
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link href="products">Products</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li" >
                    <Nav.Link href="/" > <BoxArrowLeft /></Nav.Link>
                </Nav.Item>
            </Nav>
            {open ? <QuickStart /> : ""}

        </>
    );
}
