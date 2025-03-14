import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Row, Col, Form, Button, Navbar, Container, Nav, FormControl } from 'react-bootstrap';
import MainNav from '../components/MainNav'; // Import the MainNav component

export default function AdvancedSearch() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const submitForm = data => {
    let queryString = 'searchBy=true';
    if (data.geoLocation) queryString += `&geoLocation=${data.geoLocation}`;
    if (data.medium) queryString += `&medium=${data.medium}`;
    queryString += `&isOnView=${data.isOnView}`;
    queryString += `&isHighlight=${data.isHighlight}`;
    queryString += `&q=${data.q}`;
    router.push(`/artwork?${queryString}`);
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand>Jacob Rivera</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/search">Advanced Search</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" />
              <Button variant="success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ marginTop: '60px' }}></div> {/* Add space after the navbar */}
      <Form onSubmit={handleSubmit(submitForm)}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Search Query</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search"
                {...register('q', { required: true })}
                className={errors.q ? 'is-invalid' : ''}
              />
              {errors.q && <div className="invalid-feedback">This field is required</div>}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Geo Location</Form.Label>
              <Form.Control type="text" placeholder="Geo Location" {...register('geoLocation')} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Medium</Form.Label>
              <Form.Control type="text" placeholder="Medium" {...register('medium')} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Currently on View" {...register('isOnView')} />
              <Form.Check type="checkbox" label="Highlighted" {...register('isHighlight')} />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="outline-light" type="submit">Search</Button> {/* Change button color */}
      </Form>
    </>
  );
}