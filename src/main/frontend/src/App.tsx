import {Col, Container, Row} from 'react-bootstrap';
import {PetList} from '@/components/pet-list/PetList.tsx';
import {useErrorContext} from '@/providers/ErrorContext.tsx';
import {FC, useEffect} from 'react';
import {setErrorHandler} from '@/api/axios.ts';
import {GlobalErrorAlert} from '@/components/global-error/GlobalErrorAlert.tsx';

export const App: FC = () => {

  const {globalError, setGlobalError} = useErrorContext();

  useEffect(() => {
    setErrorHandler(setGlobalError);
  }, [setGlobalError]);

  return (
    <>
      <GlobalErrorAlert message={globalError} onClose={() => setGlobalError(null)}/>
      <Container className="py-4 col-8">
        <Row className="mb-3 align-items-center">
          <Col>
            <h1 className="mb-4">Pet Registry</h1>
          </Col>
        </Row>
        <PetList/>
      </Container>
    </>
  );
};
