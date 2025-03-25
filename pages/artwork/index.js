import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { Row, Col, Pagination, Card } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { Button } from 'react-bootstrap';

const PER_PAGE = 12;

const fetcher = url => fetch(url).then(res => res.json());

const ArtworkCard = ({ objectID }) => {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(favouritesList.includes(objectID));

  const favouritesClicked = () => {
    if (showAdded) {
      setFavouritesList(current => current.filter(id => id !== objectID));
    } else {
      setFavouritesList(current => [...current, objectID]);
    }
    setShowAdded(!showAdded);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Artwork Title</Card.Title>
        <Card.Text>
          Dimensions: 10x10
          <Button
            variant={showAdded ? 'primary' : 'outline-primary'}
            onClick={favouritesClicked}
          >
            {showAdded ? '+ Favourite (added)' : '+ Favourite'}
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default function Artwork() {
  const [artworkList, setArtworkList] = useState(null);
  const [page, setPage] = useState(1);
  const router = useRouter();
  let finalQuery = router.asPath.includes('?') ? router.asPath.split('?')[1] : '';

  const { data, error } = useSWR(
    finalQuery ? `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}` : null,
    fetcher
  );

  useEffect(() => {
    if (data?.objectIDs?.length > 0) {
      const results = [];
      for (let i = 0; i < data.objectIDs.length; i += PER_PAGE) {
        results.push(data.objectIDs.slice(i, i + PER_PAGE));
      }
      setArtworkList(results);
      setPage(1);
    } else {
      setArtworkList([]);
    }
  }, [data]);

  const previousPage = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  const nextPage = () => {
    if (page < artworkList.length) setPage(prev => prev + 1);
  };

  if (error) return <Error statusCode={404} />;
  if (artworkList === null) return null;

  return (
    <>
      <Row className="gy-4 mt-4">
        {artworkList.length > 0 ? (
          artworkList[page - 1].map(objectID => (
            <Col lg={3} md={4} sm={6} xs={12} key={objectID}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))
        ) : (
          <Col>
            <Card>
              <Card.Body>
                <h4>Nothing Here</h4>
                Try searching for something else.
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>

      {artworkList.length > 1 && (
        <Row className="mt-4">
          <Col>
            <Pagination>
              <Pagination.Prev onClick={previousPage} disabled={page === 1} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} disabled={page >= artworkList.length} />
            </Pagination>
          </Col>
        </Row>
      )}
    </>
  );
}