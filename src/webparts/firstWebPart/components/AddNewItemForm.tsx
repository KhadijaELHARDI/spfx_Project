import * as React from 'react';
import { Panel, PrimaryButton, DefaultButton, TextField, Stack } from '@fluentui/react';
import { SPFI } from '@pnp/sp';
import { ISTUDENT } from '../../../model/interfaces';
import { saveStudent } from '../../../service/listService';

interface IAddNewItemFormProps {
  sp: SPFI;
  isOpen: boolean;
  onDismiss: () => void;
  onSubmit: () => void;
  onCancel: () => void; // Ajoutez la propriété onCancel à l'interface
}

const AddNewItemForm: React.FC<IAddNewItemFormProps> = ({ sp, isOpen, onDismiss, onSubmit, onCancel }) => { // Assurez-vous que onCancel est bien déstructuré
  const [formData, setFormData] = React.useState<ISTUDENT>({
    Title: '',
    name: '',
    cycle: '',
    age: 0
  });

  const handleChange = (fieldName: keyof ISTUDENT) => (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    setFormData(prevState => ({
      ...prevState,
      [fieldName]: newValue || ''
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log('Données du formulaire à soumettre :', formData);
      await saveStudent(sp, formData);
      onSubmit();
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  const handleCancel = () => {
    onCancel(); // Appelez la fonction onCancel lorsque l'utilisateur annule
    setFormData({
      Title: '',
      name: '',
      cycle: '',
      age: 0
    });
  };

  return (
    <Panel
      isOpen={isOpen}
      onDismiss={onDismiss}
      headerText="Nouvel élément"
    >
      <Stack tokens={{ childrenGap: 15 }}>
        <TextField label="Title" value={formData.Title} onChange={handleChange('Title')} />
        <TextField label="Name" value={formData.name} onChange={handleChange('name')} />
        <TextField label="Cycle" value={formData.cycle} onChange={handleChange('cycle')} />
        <TextField label="Age" value={formData.age.toString()} onChange={handleChange('age')} />
        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <PrimaryButton text="Enregistrer" onClick={handleSubmit} />
          <DefaultButton text="Annuler" onClick={handleCancel} />
        </Stack>
      </Stack>
    </Panel>
  );
};

export default AddNewItemForm;
