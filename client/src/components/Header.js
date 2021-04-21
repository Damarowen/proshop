import React from 'react'
import { Navbar,Nav, Container } from 'react-bootstrap'

const Header = () => {
    return (
        <div>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                <Navbar.Brand href="/">Proshop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/login"><i class="fas fa-cart-plus" aria-hidden="true"></i> Cart</Nav.Link>
                        <Nav.Link href="/cart"> <i class="fas fa-user" aria-hidden="true"></i>   Sign In</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header
