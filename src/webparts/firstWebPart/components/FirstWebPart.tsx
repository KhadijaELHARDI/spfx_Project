import * as React from 'react';

import type { IFirstWebPartProps } from './IFirstWebPartProps';
import { SPFI } from '@pnp/sp';
import { ISTUDENT } from '../../../interfaces';
import { getSP } from '../../../pnpjsConfig';



const Std = (props:IFirstWebPartProps) =>{

  //const LOG_SOURCE = 'STD Webpart';
  const LIST_NAME = 'lstStudents';
  let _sp:SPFI = getSP(props.context);
  const [stds,setStds] = React.useState<ISTUDENT[]>([])

  const getSTDItems = async () => {
    //console.log('context',_sp)
     const items = _sp.web.lists.getByTitle(LIST_NAME).items();
    console.log('STD Items',items)

     setStds((await items).map((item:any) => {
      return {
        Id: item.Id,
        Title:item.Title,
        Name:item.name,
        Cycle:item.cycle,
        Age:item.age
      }
     }));

     console.log(items)
  }
  /*const test = async () => {
    const items = await _sp.web.lists.getByTitle("lstStudents").items();
    console.log(items)
   
  };*/
 
    
  

  React.useEffect(() => {
   
      getSTDItems();
    
    
    //test();

  },[])
  return (
    <>
    <h1>Hello World</h1>
 
   <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Name</th>
            <th>Cycle</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {stds.map((std) => (
            <tr key={std.Id}>
              <td>{std.Id}</td>
              <td>{std.Title}</td>
              <td>{std.Name}</td>
              <td>{std.Cycle}</td>
              <td>{std.Age}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </>
  )

}

export default Std

