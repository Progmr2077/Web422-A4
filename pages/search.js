import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function AdvancedSearch() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const submitForm = (data) => {
    let queryString = 'searchBy=true';
    if (data.geoLocation) queryString += `&geoLocation=${data.geoLocation}`;
    if (data.medium) queryString += `&medium=${data.medium}`;
    queryString += `&isOnView=${data.isOnView}`;
    queryString += `&isHighlight=${data.isHighlight}`;
    queryString += `&q=${data.q}`;

    router.push(`/artwork?${queryString}`);
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="searchBy">
          <Form.Label>Search By</Form.Label>
          <Form.Control as="select" {...register('searchBy')}>
            <option value="title">Title</option>
            <option value="artist">Artist</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="geoLocation">
          <Form.Label>Geo Location</Form.Label>
          <Form.Control type="text" {...register('geoLocation')} />
        </Form.Group>

        <Form.Group as={Col} controlId="medium">
          <Form.Label>Medium</Form.Label>
          <Form.Control type="text" {...register('medium')} />
        </Form.Group>

        <Form.Group as={Col} controlId="isOnView">
          <Form.Check type="checkbox" label="On View" {...register('isOnView')} />
        </Form.Group>

        <Form.Group as={Col} controlId="isHighlight">
          <Form.Check type="checkbox" label="Highlight" {...register('isHighlight')} />
        </Form.Group>
      </Row>

      <Form.Group controlId="q">
        <Form.Label>Query</Form.Label>
        <Form.Control
          type="text"
          className={errors.q ? 'is-invalid' : ''}
          {...register('q', { required: true })}
        />
        {errors.q && <div className="invalid-feedback">This field is required.</div>}
      </Form.Group>

      <Button variant="primary" type="submit">Search</Button>
    </Form>
  );
}