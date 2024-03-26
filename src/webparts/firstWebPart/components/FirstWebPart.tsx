import * as React from 'react';
import { SPFI } from '@pnp/sp';
import { IFirstWebPartProps } from './IFirstWebPartProps';
import { ISTUDENT } from '../../../model/interfaces';
import { getSP } from '../../../pnpjsConfig';
import { getStudents } from '../../../service/listService';
import { getCurrentUser } from '../../../service/listService';
import { getNameSiteGroups} from '../../../service/groupService';
import { useEffect, useState } from 'react';
import AddNewItemForm from './AddNewItemForm';
import { Stack } from '@fluentui/react';
import './StdStyles.css';


const Std: React.FC<IFirstWebPartProps> = (props) => {
  const _sp: SPFI = getSP(props.context);
  const [stds, setStds] = useState<ISTUDENT[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showWebPart, setShowWebPart] = useState<boolean>(false);



  const getData = async () => {
    const stdData = await getStudents(_sp);
    setStds(stdData);
  };
  const fetchData = async () => {
    try {
      // Utilisez await pour obtenir la valeur résolue de la promesse retournée par getCurrentUser
      const user = await getCurrentUser(_sp);
  
      if (props.people.length > 0) {
        // Parcourir chaque personne sélectionnée
        for (const selectedPerson of props.people) {
          // Extraire le login de la personne sélectionnée
          const selectedPersonLogin = selectedPerson.login;
  
          // Vérifier si le format du login est une adresse e-mail
          if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(selectedPersonLogin)) {
            // Si le format est une adresse e-mail, traitez-le comme un utilisateur
            if (user === selectedPersonLogin) {
              // Si les noms correspondent, affichez la liste des étudiants
              setShowWebPart(true);
              break;
            }
          } else {
            // Si le format n'est pas une adresse e-mail, traitez-le comme un groupe
            const groupUsers = await getNameSiteGroups(_sp, selectedPersonLogin);
            console.log(groupUsers)
            const groupUserLogins = groupUsers.map(user => user.Email);
            let userFound = false;
            for (const groupUserLogin of groupUserLogins) {
              if (groupUserLogin === user) {
                userFound = true;
                break;
              }
            }
            if (userFound) {
              setShowWebPart(true);
              break;
            }
          }
        }
      }
    } catch (error) {
      console.error('Error retrieving student data:', error);
    }
  };
  
  
  
  




  useEffect(() => {
    getData();

    //const item=getCurrentUser(_sp);
    //console.log(item)
    //console.log(props.people)
    fetchData();
    console.log(props.people);
  }, [props.people, showWebPart]);


  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleSubmitForm = async () => {
    try {
      await getData(); // Mettez à jour les données après la soumission pour afficher la liste mise à jour
      setShowForm(false); // Cachez le formulaire après soumission
    } catch (error) {
      console.error('Error retrieving student data:', error);
    }
  };

  const handleHideForm = () => {
    setShowForm(false);
  };
  return (
    <>
      {showWebPart ? (
        <div> test cache de web part</div>
      ) : (
        <>
          <div className="student-list">
            <Stack horizontal horizontalAlign="start" styles={{ root: { marginBottom: 10 } }}>
              <button onClick={handleShowForm}>+ Nouveau</button>
            </Stack>
            <h2>Student List</h2>
            <table className="student-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Name</th>
                  <th>Cycle</th>
                  <th>Age</th>
                </tr>
              </thead>
              <tbody>
                {stds.map(student => (
                  <tr key={student.Id}>
                    <td>{student.Id}</td>
                    <td>{student.Title}</td>
                    <td>{student.name}</td>
                    <td>{student.cycle}</td>
                    <td>{student.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {showForm && <AddNewItemForm sp={_sp} onSubmit={handleSubmitForm} onCancel={handleHideForm} isOpen={true} onDismiss={handleHideForm} />}
          </div>
        </>
      )
      }


    </>
  );

};

export default Std;
