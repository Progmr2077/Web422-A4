import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import Error from 'next/error';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,
    fetcher
  );

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  const {
    primaryImage,
    title,
    objectDate,
    classification,
    medium,
    artistDisplayName,
    artistWikidata_URL,
    creditLine,
    dimensions,
  } = data;

  return (
    <Card>
      {primaryImage && <Card.Img variant="top" src={primaryImage} alt={title || 'N/A'} />}
      <Card.Body>
        <Card.Title>{title || 'N/A'}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {objectDate || 'N/A'} <br />
          <strong>Classification:</strong> {classification || 'N/A'} <br />
          <strong>Medium:</strong> {medium || 'N/A'} <br /><br />
          <strong>Artist:</strong> 
          {artistDisplayName ? (
            <>
              {artistDisplayName} <a href={artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a>
            </>
          ) : 'N/A'}
          <br />
          <strong>Credit Line:</strong> {creditLine || 'N/A'} <br />
          <strong>Dimensions:</strong> {dimensions || 'N/A'}
        </Card.Text>
        <Link href={`/artwork/${objectID}`} passHref>
          <Button variant="primary">{objectID}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}