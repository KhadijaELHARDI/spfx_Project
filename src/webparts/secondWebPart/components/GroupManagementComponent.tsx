import * as React from 'react';
import { SPHttpClient } from '@microsoft/sp-http';
import { PrimaryButton, TextField, Stack } from '@fluentui/react';
import { createNewSiteGroup } from '../../../service/groupService';

interface IGroupManagementProps {
  spHttpClient: SPHttpClient;
  // Inclure ISecondWebPartProps ici si nécessaire
}

const GroupManagement: React.FC<IGroupManagementProps> = ({ spHttpClient }) => {
  const [groupName, setGroupName] = React.useState('');

  const handleCreateGroup = async () => {
    try {
      await createNewSiteGroup(groupName); 
      setGroupName('');
    } catch (error) {
      console.error('Erreur lors de la création du groupe:', error);
    }
  };

  return (
    <div>
      <h2>Gestion des groupes</h2>
      <Stack tokens={{ childrenGap: 10 }}>
        <TextField label="Nom du groupe" value={groupName} onChange={(e, newValue) => setGroupName(newValue || '')} />
        <PrimaryButton text="Créer un groupe" onClick={handleCreateGroup} />
      </Stack>
    </div>
  );
};

export default GroupManagement;
