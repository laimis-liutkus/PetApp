import {Col, Container, Row} from 'react-bootstrap';
import {PetList} from '@/components/pet-list/PetList.tsx';

export const App = () => {

  return (
    <Container className="py-4 col-8">
      <Row className="mb-3 align-items-center">
        <Col>
          <h1 className="mb-4">Pet Registry</h1>
        </Col>
      </Row>
      <PetList/>
    </Container>
  );
};
