import * as React from 'react';
import { Stack } from '@fluentui/react';
import GroupManagement from '../components/GroupManagementComponent';
import { ISecondWebPartProps } from './ISecondWebPartProps';

const SecondWebPart: React.FC<ISecondWebPartProps> = (props) => {
  

  return (
    <div>
      <h1>Ma Web Part</h1>
      <Stack tokens={{ childrenGap: 10 }}>
        {/* Supprimer le bouton "Gestion de groupe" */}
      </Stack>
      {/* Affichez directement la gestion de groupe au chargement de la Web Part */}
      <GroupManagement context={props.context} />
    </div>
  );
};

export default SecondWebPart;

