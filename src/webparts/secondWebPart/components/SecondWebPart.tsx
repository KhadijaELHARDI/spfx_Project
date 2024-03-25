import * as React from 'react';
import { DefaultButton, Stack } from '@fluentui/react';
import GroupManagement from '../components/GroupManagementComponent';
import { ISecondWebPartProps } from './ISecondWebPartProps'

const SecondWebPart: React.FC<ISecondWebPartProps> = ({ spHttpClient }) => {
  const [showGroupManagement, setShowGroupManagement] = React.useState(false);

  const handleToggleGroupManagement = (): void => {
    setShowGroupManagement(!showGroupManagement);
  };
  
  return (
    <div>
      <h1>Ma Web Part</h1>
      <Stack tokens={{ childrenGap: 10 }}>
        <DefaultButton text="Gestion de groupe" onClick={handleToggleGroupManagement} />
      </Stack>
      {showGroupManagement && <GroupManagement spHttpClient={spHttpClient} />}
    </div>
  );
};

export default SecondWebPart;
