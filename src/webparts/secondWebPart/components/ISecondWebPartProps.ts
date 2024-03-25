import { SPHttpClient } from '@microsoft/sp-http';
export interface ISecondWebPartProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  spHttpClient: SPHttpClient; // spHttpClient si elle est requise par GroupManagementComponent
}
