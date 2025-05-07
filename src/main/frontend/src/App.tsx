import {Col, Container, Row} from 'react-bootstrap';
import {PetList} from '@/components/pet-list/PetList.tsx';
import {useErrorContext} from '@/providers/ErrorContext.tsx';
import {FC, useEffect} from 'react';
import {setErrorHandler} from '@/api/axios.ts';

export const App: FC = () => {

  const {setGlobalError} = useErrorContext();

  useEffect(() => {
    setErrorHandler(setGlobalError);
  }, [setGlobalError]);

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
