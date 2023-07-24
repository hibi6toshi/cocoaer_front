import axios from "axios"
import { myPostIndexUrl } from "../urls"
import { contentType } from "../types"

export const getMyPosts = async (token: string, contentType: contentType) => {
  const headers = {
      Authorization: token,
  }

  const params = {
    content_type: contentType,
  }

  return axios.get( 
    myPostIndexUrl,
    {
      params,
      headers
    }
  ).then(res => {
    return res
  })
  .catch((e: any) => console.error(e))
  
} 