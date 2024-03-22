import * as React from 'react';
import { SPHttpClient} from '@microsoft/sp-http';
import { DefaultButton, Stack } from '@fluentui/react';
import GroupManagement from '../components/GroupManagementComponent'; // Importez le composant GroupManagement


export interface ISecondWebPartProps {
  spHttpClient: SPHttpClient;
}

const SecondWebPart: React.FC<ISecondWebPartProps> = ({ spHttpClient }) => {
  const [showGroupManagement, setShowGroupManagement] = React.useState(false); // Ajoutez un état pour contrôler l'affichage du composant GroupManagement

  const handleToggleGroupManagement = () => {
    setShowGroupManagement(!showGroupManagement); // Inversez l'état pour afficher ou masquer le composant GroupManagement
  };

  return (
    <div>
      <h1>Ma Web Part</h1>
      <Stack tokens={{ childrenGap: 10 }}>
        <DefaultButton text="Gestion de groupe" onClick={handleToggleGroupManagement} /> {/* Ajoutez un bouton pour afficher ou masquer le composant GroupManagement */}
      </Stack>
      {showGroupManagement && <GroupManagement spHttpClient={spHttpClient} />} {/* Affichez le composant GroupManagement si showGroupManagement est true */}
    </div>
  );
};

export default SecondWebPart;
