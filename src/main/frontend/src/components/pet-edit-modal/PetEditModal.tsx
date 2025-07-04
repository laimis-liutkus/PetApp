import {FC, FormEvent, useEffect, useState} from 'react';
import {Pet, PetSpecie} from '@/api/types.ts';
import {Button, Form, FormLabel, Modal} from 'react-bootstrap';
import {formattedDate} from '@/utils/dateUtils.ts';
import {useAddPet, useGetAllPetSpecies, useUpdatePet} from '@/api/queries.ts';

const MAX_NAME_LENGTH = 255;
const MAX_MICROCHIP_NUMBER_LENGTH = 20;
const EMPTY_SPECIE: PetSpecie = {name: '', title: ''};

interface FormData {
  name: string;
  microchipNumber: string;
  specie: string;
  birthdate: Date;
}

interface PetEditModalProps {
  isModalOpen: boolean;
  selectedPet: Pet | null;
  onClose: (saved: boolean) => void;
}

const initialFormData: FormData = {
  name: '',
  microchipNumber: '',
  specie: '',
  birthdate: new Date(),
};

const initialFormErrors = {name: '', microchipNumber: '', specie: '', birthdate: ''};

export const PetEditModal: FC<PetEditModalProps> = ({isModalOpen, selectedPet, onClose}) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [petSpecies, setPetSpecies] = useState<PetSpecie[]>([]);

  const {
    data: petSpecieData,
    isFetching: isPetSpecieFetching,
    isError: isPetSpecieError
  } = useGetAllPetSpecies();
  const {mutate: addPet} = useAddPet();
  const {mutate: updatePet} = useUpdatePet();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const savedPet: Pet = {
        ...selectedPet,
        name: formData?.name?.trim(),
        microchipNumber: formData?.microchipNumber?.trim(),
        specie: formData?.specie?.trim(),
        birthdate: new Date(formData?.birthdate ?? '')
      };
      if (!savedPet.id) {
        addPet(savedPet, {onSuccess: () => onClose(true)});
      } else {
        updatePet(savedPet, {onSuccess: () => onClose(true)});
      }
    }
  };

  const validateForm = (): boolean => {
    const errors = {...initialFormErrors};
    const name = formData.name.trim();
    if (!name) {
      errors.name = 'Pet name is mandatory';
    } else if (name.length > MAX_NAME_LENGTH) {
      errors.name = `Pet name must be no longer than ${MAX_NAME_LENGTH} characters`;
    }
    const microchipNumber = formData.microchipNumber.trim();
    if (microchipNumber) {
      if (microchipNumber.length > MAX_MICROCHIP_NUMBER_LENGTH) {
        errors.microchipNumber = `Microchip number must be no longer than ${MAX_MICROCHIP_NUMBER_LENGTH} characters`;
      } else if (!microchipNumber.match(/^\d+$/g)) {
        errors.microchipNumber = `Microchip number must contain only digits`;
      }
    }
    if (!formData.specie.trim()) {
      errors.specie = 'Pet specie is mandatory';
    }
    if (!formData.birthdate) {
      errors.birthdate = 'Pet birthdate is mandatory';
    }
    setFormErrors(errors);
    return !Object.values(errors).some(e => e);
  };

  useEffect(() => {
    setFormErrors(initialFormErrors);
    if (selectedPet) {
      setFormData({
        name: selectedPet.name,
        microchipNumber: selectedPet.microchipNumber || '',
        specie: selectedPet.specie,
        birthdate: selectedPet.birthdate
      });
    }
  }, [selectedPet]);

  useEffect(() => {
    if (!isPetSpecieFetching && !isPetSpecieError && petSpecieData) {
      setPetSpecies([EMPTY_SPECIE].concat(petSpecieData.data));
    }
  }, [isPetSpecieFetching, isPetSpecieError, petSpecieData]);

  return (
    <Modal show={isModalOpen} animation={true} centered>
      <Modal.Header onClick={() => onClose(false)} closeButton>
        <Modal.Title>
          {selectedPet ? `Pet '${selectedPet.name}'` : 'Add Pet'}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <FormLabel>
              Name
              <span className="text-danger"> *</span>
            </FormLabel>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => {
                setFormData({...formData, name: e.target.value});
                setFormErrors({...formErrors, name: ''});
              }}
              isInvalid={!!formErrors.name}
            />
            <Form.Control.Feedback type="invalid">{formErrors.name}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <FormLabel>Microchip Number (digits only)</FormLabel>
            <Form.Control
              name="microchipNumber"
              value={formData.microchipNumber}
              onChange={(e) => {
                setFormData({...formData, microchipNumber: e.target.value});
                setFormErrors({...formErrors, microchipNumber: ''});
              }}
              isInvalid={!!formErrors.microchipNumber}
            />
            <Form.Control.Feedback type="invalid">{formErrors.microchipNumber}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <FormLabel>
              Specie
              <span className="text-danger"> *</span>
            </FormLabel>
            <Form.Select
              name="specie"
              value={formData.specie}
              onChange={(e) => {
                setFormData({...formData, specie: e.target.value});
                setFormErrors({...formErrors, specie: ''});
              }}
              isInvalid={!!formErrors.specie}
            >
              {petSpecies.map((specie) => (<option key={specie.name} value={specie.name}>{specie.title}</option>))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{formErrors.specie}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <FormLabel>
              Birthdate
              <span className="text-danger"> *</span>
            </FormLabel>
            <Form.Control
              type="date"
              name="birthdate"
              value={formData.birthdate ? formattedDate(formData.birthdate) : ''}
              placeholder={formData.birthdate ? formattedDate(formData.birthdate) : ''}
              onChange={(e) => {
                setFormData({...formData, birthdate: new Date(e.target.value)});
                setFormErrors({...formErrors, birthdate: ''});
              }}
              isInvalid={!!formErrors.birthdate}
            />
            <Form.Control.Feedback type="invalid">{formErrors.birthdate}</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onClose(false)}>Cancel</Button>
          <Button type="submit" variant="primary">Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
