import axios from "axios";


export async function addCase(caseValues:FormData) {
    return axios.put("/case/add", caseValues);
}

export async function getAllCasesTable(page:number, perPage: number, searchContext?:string){
    return await axios.get(`/case/all/${page}/${perPage}/${searchContext??''}`);
}

export async function getCase(id:string){
    return await axios.get(`/case/get/${id}`);
}

export async function editCase(values: FormData, id:string){
    return await axios.post(`/case/edit/${id}`, values);
}
export async function deleteCase(id:string){
    return await axios.delete(`/case/delete/${id}`);
}