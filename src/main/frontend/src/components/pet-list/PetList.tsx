import {Button, Col, Row, Table} from 'react-bootstrap';
import {formattedDate} from '@/utils/dateUtils.ts';
import {PetEditModal} from '@/components/pet-edit-modal/PetEditModal.tsx';
import {FC, useEffect, useState} from 'react';
import {useDeletePet, useGetAllPets} from '@/api/queries.ts';
import {Pet} from '@/api/types.ts';

export const PetList: FC = () => {
  const {
    data: petData,
    isFetching: isPetDataFetching,
    isError: isPetDataError,
    refetch: refetchPetData
  } = useGetAllPets();
  const {mutate: deletePet} = useDeletePet();
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isPetEditModalOpen, setIsPetEditModalOpen] = useState(false);

  useEffect(() => {
    if (!isPetDataFetching && !isPetDataError && petData) {
      setPets(petData);
    }
  }, [petData, isPetDataFetching, isPetDataError]);

  const openPetEditModal = (selectedPet: Pet | null) => {
    setSelectedPet(selectedPet);
    setIsPetEditModalOpen(true);
  };

  const closePetEditModal = async (saved: boolean) => {
    setIsPetEditModalOpen(false);
    if (saved) {
      await refetchPetData();
    }
  };

  const handleDeletePet = (pet: Pet) => {
    if (pet && pet.id && confirm(`Are you sure you want to delete ${pet.name}?`)) {
      deletePet(pet.id, {onSuccess: () => refetchPetData()});
    }
  };

  const formatAge = (age?: number) => {
    return age ? `${age}` : '<1';
  };

  return (
    <>
      {isPetDataFetching ? (
        <p>Loading...</p>
      ) : (
        <>
          <Row className="mb-3 align-items-center">
            <Col>
              <button className="btn btn-primary" onClick={() => openPetEditModal(null)}>Add Pet</button>
            </Col>
          </Row>

          <Table hover responsive>
            <thead>
            <tr>
              <th className="col-2">Name</th>
              <th className="col-3">Microchip Number</th>
              <th className="col-2">Specie</th>
              <th className="col-2">Birthdate</th>
              <th className="col-1">Age</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {pets.map(pet => (
                <tr key={pet.id}>
                  <td>{pet.name}</td>
                  <td>{pet.microchipNumber}</td>
                  <td>{pet.specieTitle}</td>
                  <td>{formattedDate(pet.birthdate)}</td>
                  <td>{formatAge(pet.age)}</td>
                  <td className="text-end">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => openPetEditModal(pet)}>
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeletePet(pet)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              )
            )}
            </tbody>
          </Table>
        </>
      )}
      {isPetEditModalOpen && (
        <PetEditModal
          isModalOpen={isPetEditModalOpen}
          selectedPet={selectedPet}
          onClose={closePetEditModal}
        />
      )}
    </>
  );
};
