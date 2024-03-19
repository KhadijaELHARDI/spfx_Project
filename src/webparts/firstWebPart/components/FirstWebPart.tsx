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
    // console.log('STD Items',items)

     setStds((await items).map((item:any) => {
      return {
        Id: item.Id,
        Title:item.Title,
        Name:item.Name,
        Cycle:item.Cycle,
        Age:item.Age
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
    <pre>{JSON.stringify(stds,null,5)}</pre>
    </>
  )

}

export default Std

