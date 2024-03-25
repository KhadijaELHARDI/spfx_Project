import { ISTUDENT } from "../model/interfaces";
import { SPFI } from "@pnp/sp";
import "@pnp/sp/site-users/web";


const LIST_NAME="lstStudents";
const getStudents = async (sp :SPFI) :Promise<ISTUDENT[]> =>{
    const items =await sp.web.lists.getByTitle(LIST_NAME).items();
    return items.map((item:any) => mapToStudent(item));
};
 const saveStudent = async (sp: SPFI,student:ISTUDENT):Promise<void> => {
    
    await sp.web.lists.getByTitle(LIST_NAME).items.add(student);

 };
//  const updateStudent = async (sp:SPFI,student:ISTUDENT):Promise<void> => {
//     await sp.web.lists.getByTitle(LIST_NAME).items.getById(student.Id).update(student);
//  };
 const deleteStudent = async (sp:SPFI, id : number):Promise<void> => {
    await sp.web.lists.getByTitle(LIST_NAME).items.getById(id).delete();
 };
export const getCurrentUser = async (sp:SPFI) : Promise<string> =>{
    const user = await sp.web.currentUser();
    return user.Email;
}

 const mapToStudent = (item: any) : ISTUDENT => {
    
    return {
        Id: item.Id,
        Title: item.Title,
        name: item.name,
        cycle: item.cycle,
        age: item.age
    };
}



export {getStudents,saveStudent,deleteStudent}