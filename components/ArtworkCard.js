import useSWR from 'swr';
import Error from 'next/error';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';

const fetcher = url => fetch(url).then(res => res.json());

export default function ArtworkCard({ objectID }) {
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`, fetcher);

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  // Set a placeholder image if primaryImageSmall is not available
  const placeholderImage = 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]';

  return (
    <Card>
      {/* Render primaryImageSmall if available, else render placeholder */}
      <Card.Img 
        variant="top" 
        src={data.primaryImageSmall || placeholderImage} 
        alt={data.title || 'Artwork image'} 
      />
      <Card.Body>
        <Card.Title>{data.title || 'N/A'}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {data.objectDate || 'N/A'}<br />
          <strong>Classification:</strong> {data.classification || 'N/A'}<br />
          <strong>Medium:</strong> {data.medium || 'N/A'}
        </Card.Text>
        {/* Button wrapped in Link */}
        <Link href={`/artwork/${objectID}`} passHref>
          <Button variant="primary">{objectID}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}