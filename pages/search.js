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
                {...register('searchQuery', { required: true })}
                className={errors.searchQuery ? 'is-invalid' : ''}
              />
              {errors.searchQuery && <div className="invalid-feedback">This field is required</div>}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Search By</Form.Label>
              <Form.Control as="select" {...register('SearchBy', { required: true })} className={errors.searchType ? 'is-invalid' : ''}>
                <option value="Title">Title</option>
                <option value="Tags">Tags</option>
                <option value="Artist or Culture">Artist or Culture</option>
              </Form.Control>
              {errors.searchType && <div className="invalid-feedback">This field is required</div>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Currently on View" {...register('isOnView')} />
              <Form.Check type="checkbox" label="Highlighted" {...register('isHighlight')} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Geo Location</Form.Label>
              <Form.Control type="text" {...register('geoLocation')} />
              <Form.Text className="text-muted">
                Case Sensitive String (ie "Europe", "France", "Paris", "China", "New York", etc.), with multiple values separated by the | operator
              </Form.Text>
            </Form.Group>            
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Medium</Form.Label>
              <Form.Control type="text" {...register('medium')} />
              <Form.Text className="text-muted">
                Case Sensitive String (ie: "Ceramics", "Furniture", "Paintings", "Sculpture", "Textiles", etc.), with multiple values separated by the | operator
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="outline-light" type="submit">Submit</Button> {/* Change button color */}
      </Form>
    </>
  );
}