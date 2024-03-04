import axios from "axios";
import { USER_TOKEN } from "./constans.ts";
import { getCookie, getStorageItem } from "./helpers.ts";

export function getToken(): string {
  return getCookie(USER_TOKEN) || getStorageItem(USER_TOKEN) || '';
}

export async function checkToken():Promise<boolean>{
  const user = await getAuthanticatedUser();
  if(user) return true;
  return false;
}

export async function getAuthanticatedUser(){
  try{
    const respons = await axios.get("/user/getAuthentcatedUser")
    if(respons.data.status == 200){
      return respons.data.user
    }
  }catch{
    return;
  }
  return;
}