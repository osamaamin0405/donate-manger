import axios from "axios";


// export async function login(username: string, password: string){

//     return;
// }


export async function addUserRequest(values: any){
    return axios.put("/user/create", values);
}

export async function getUsers(page: number, perPage:number, qeuryContext:string){     
    return await axios.get(`/user/all/${page}/${perPage}/${qeuryContext}`);
}
export async function getUser(id:string){     
    return await axios.get(`/user/get/${id}`);
}

export async function editUser(id:string, values:any){     
    return await axios.post(`/user/edit/${id}`, values);
}

export async function deleteUser(id:string) {
    return await axios.delete(`/user/delete/${id}`);
}