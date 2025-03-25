import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import { Row, Col } from 'react-bootstrap';
import ArtworkCard from '../components/ArtworkCard';

const Favourites = () => {
  const [favouritesList] = useAtom(favouritesAtom);

  return (
    <div>
      {favouritesList.length === 0 ? (
        <p>Nothing Here Try adding some new artwork to the list.</p>
      ) : (
        <Row>
          {favouritesList.map(objectID => (
            <Col key={objectID} sm={6} md={4} lg={3}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Favourites;
