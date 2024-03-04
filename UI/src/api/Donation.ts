import axios from "axios";
import { CreateFormData } from "../utils/helpers";




export async function getDonations(page: number, perPage:number, qeuryContext:string){     
    return await axios.get(`/donation/all/${page}/${perPage}/${qeuryContext}`);
}

export async function editDonation(id:string, values:any) {
    return axios.post(`/donation/edit/${id}`, CreateFormData(values));
}

export async function getDonation(id:string) {
    return axios.get(`/donation/${id}`);
}

export async function deleteDonation(id:string) {
    return axios.delete(`/donation/delete/${id}`);
}