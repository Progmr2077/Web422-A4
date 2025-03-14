import { Navbar, Nav, Form, Button } from 'react-bootstrap';
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
    <>
      <Navbar bg="primary" variant="dark" fixed="top" className="fixed-top">
        <Navbar.Brand>Jacob</Navbar.Brand> {/* Replace 'Jacob' with your actual name */}
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
      </Navbar>
      <br /><br />
    </>
  );
}