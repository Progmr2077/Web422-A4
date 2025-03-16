import { Navbar, Nav, Form, Button, Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';

export default function MainNav() {
    const router = useRouter();
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        router.push(`/artwork?title=true&q=${search}`);
    };

    return (
        <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
            <Container>
                <Navbar.Brand>Jacob Rivera</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link href="/" passHref legacyBehavior>
                            <Nav.Link>Home</Nav.Link>
                        </Link>
                        <Link href="/search" passHref legacyBehavior>
                            <Nav.Link>Advanced Search</Nav.Link>
                        </Link>
                    </Nav>
                    <Form className="d-flex" onSubmit={handleSearch}>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button variant="outline-light" type="submit">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}