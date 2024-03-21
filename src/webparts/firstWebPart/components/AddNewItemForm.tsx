import * as React from 'react';
import { Panel, PrimaryButton, DefaultButton, TextField, Stack } from '@fluentui/react';
import { SPFI } from '@pnp/sp';
import { ISTUDENT } from '../../../interfaces';
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
    Id: 0,
    Title: '',
    Name: '',
    Cycle: '',
    Age: 0
  });

  const handleChange = (fieldName: keyof ISTUDENT) => (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    setFormData(prevState => ({
      ...prevState,
      [fieldName]: newValue || ''
    }));
  };

  const handleSubmit = async () => {
    try {
      await saveStudent(sp, formData);
      onSubmit();
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  const handleCancel = () => {
    onCancel(); // Appelez la fonction onCancel lorsque l'utilisateur annule
    setFormData({
      Id: 0,
      Title: '',
      Name: '',
      Cycle: '',
      Age: 0
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
        <TextField label="Name" value={formData.Name} onChange={handleChange('Name')} />
        <TextField label="Cycle" value={formData.Cycle} onChange={handleChange('Cycle')} />
        <TextField label="Age" value={formData.Age.toString()} onChange={handleChange('Age')} />
        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <PrimaryButton text="Enregistrer" onClick={handleSubmit} />
          <DefaultButton text="Annuler" onClick={handleCancel} />
        </Stack>
      </Stack>
    </Panel>
  );
};

export default AddNewItemForm;
