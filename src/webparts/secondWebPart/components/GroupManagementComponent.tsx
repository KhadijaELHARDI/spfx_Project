import * as React from 'react';
import { PrimaryButton, TextField, Stack, Dialog, DialogFooter, DialogType, DefaultButton } from '@fluentui/react';
import { createNewSiteGroup } from '../../../service/groupService';
import { SPFI } from '@pnp/sp';
import { getSP } from '../../../pnpjsConfig';

import { WebPartContext } from '@microsoft/sp-webpart-base';
interface GroupInterface {
  context: WebPartContext,
}

const GroupManagement: React.FC<GroupInterface> = ({ context }) => {
  const _sp: SPFI = getSP(context);
  const [showDialog, setShowDialog] = React.useState(false); // État pour contrôler l'affichage de la boîte de dialogue
  const [groupName, setGroupName] = React.useState(''); // État pour le nom du groupe
  const [groupDescription, setGroupDescription] = React.useState(''); // État pour la description du groupe

  const handleCreateGroup = () => {
    setShowDialog(true); // Afficher la boîte de dialogue
  };

  const handleCloseDialog = () => {
    setShowDialog(false); // Fermer la boîte de dialogue
  };

  const handleSubmitDialog = async () => {
    try {
      await createNewSiteGroup(_sp, groupName, groupDescription);
      setGroupName(''); // Réinitialiser le nom du groupe après la création
      setGroupDescription(''); // Réinitialiser la description du groupe après la création
      setShowDialog(false); // Fermer la boîte de dialogue après la création
    } catch (error) {
      console.error('Erreur lors de la création du groupe:', error);
    }
  };

  return (
    <div>
      <h2>Gestion des groupes</h2>
      <PrimaryButton text="Créer un groupe" onClick={handleCreateGroup} />

      {/* Boîte de dialogue modale pour saisir le nom et la description du groupe */}
      <Dialog hidden={!showDialog} onDismiss={handleCloseDialog} dialogContentProps={{ type: DialogType.largeHeader }}>
        <Stack tokens={{ childrenGap: 20 }}>
          <TextField label="Nom du groupe" value={groupName} onChange={(e, newValue) => setGroupName(newValue || '')} />
          <TextField label="Description du groupe" multiline rows={3} value={groupDescription} onChange={(e, newValue) => setGroupDescription(newValue || '')} />
          <DialogFooter>
            <PrimaryButton text="Créer" onClick={handleSubmitDialog} />
            <DefaultButton text="Annuler" onClick={handleCloseDialog} />
          </DialogFooter>
        </Stack>
      </Dialog>
    </div>
  );
};

export default GroupManagement;

