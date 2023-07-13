import axios from "axios"
import { createForumUrl, forumsIndexUrl } from "../urls/index"

export const getForums = async () =>  {
  return axios.get(forumsIndexUrl)
  .then(res => {
    return res.data
  })
  .catch((e: any) => console.error(e))
}

export const getForum = async (token: string, forumId: string) => {
  const headers = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    }
  }

  return axios.get(`${forumsIndexUrl}/${forumId}`, headers)
  .then(res => {
    return res.data
  })
  .catch((e: any) => console.error(e))
}

export const createForum = async (token: string, formData: FormData) => {
  const headers = {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
    }
  }

  return axios.post(
    createForumUrl,
    formData,
    headers 
  )//.then(res => {
  //   // if(res.statusText === "OK"){
  //   //   return res.data.data
  //   // }
  //   // throw new Error("axios failed")
  //   return res.data.data
  // })
  // .catch((e: any) => {
  //   console.error(e);
  //   throw  e ;
  // })
}