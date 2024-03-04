import axios from "axios";

export async function addCategory(values: any){
    return await axios.put("/category/add", values)
}

export async function getAllCategory(page:number, perPage: number, searchContext?:string){
    return await axios.get(`/category/all/${page}/${perPage}/${searchContext??''}`);
}

export async function getCategory(id:string){
    return await axios.get(`/category/${id}`);
}

export async function editCategory(id:string, values:any){
    return await axios.post(`/category/edit/${id}`, values);
}

export async function deleteCategory(id:string){
    return await axios.delete(`/category/delete/${id}`);
}
