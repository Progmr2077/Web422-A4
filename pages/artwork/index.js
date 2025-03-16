import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { Row, Col, Pagination, Card } from 'react-bootstrap';
import ArtworkCard from '../../components/ArtworkCard';

const PER_PAGE = 12;

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Artwork() {
  const [artworkList, setArtworkList] = useState(null);
  const [page, setPage] = useState(1);
  const router = useRouter();
  let finalQuery = router.asPath.split('?')[1];

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      const results = [];
      for (let i = 0; i < data.objectIDs.length; i += PER_PAGE) {
        const chunk = data.objectIDs.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  const previousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const nextPage = () => {
    if (page < artworkList.length) setPage(page + 1);
  };

  if (error) return <Error statusCode={404} />;
  if (!artworkList) return null;

  return (
    <>
      <Row className="gy-4 mt-4">
        {artworkList.length > 0 ? (
          artworkList[page - 1].map((objectID) => (
            <Col lg={3} md={4} sm={6} xs={12} key={objectID}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))
        ) : (
          <Col>
            <Card>
              <Card.Body>
                <h4>Nothing Found</h4>
                Try searching for something else.
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>

      {artworkList.length > 0 && (
        <Row>
          <Col>
            <Pagination>
              <Pagination.Prev onClick={previousPage} disabled={page === 1} />
              <Pagination.Item active>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} disabled={page >= artworkList.length} />
            </Pagination>
          </Col>
        </Row>
      )}
    </>
  );
}