import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useState } from 'react';

const MainNav = () => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => setIsExpanded(!isExpanded);
  const handleSelect = () => setIsExpanded(false);

  return (
    <Navbar expand="lg" expanded={isExpanded}>
      <Navbar.Brand href="/">MyApp</Navbar.Brand>
      <Navbar.Toggle onClick={handleToggle} />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Link href="/" passHref>
            <Nav.Link active={router.pathname === "/"}>Home</Nav.Link>
          </Link>
          <Link href="/search" passHref>
            <Nav.Link active={router.pathname === "/search"}>Advanced Search</Nav.Link>
          </Link>
        </Nav>
        <Nav>
          <NavDropdown title="User Name" id="basic-nav-dropdown">
            <Link href="/favourites" passHref>
              <NavDropdown.Item active={router.pathname === "/favourites"} onClick={handleSelect}>
                Favourites
              </NavDropdown.Item>
            </Link>
            <Link href="/history" passHref>
              <NavDropdown.Item active={router.pathname === "/history"} onClick={handleSelect}>
                Search History
              </NavDropdown.Item>
            </Link>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNav;