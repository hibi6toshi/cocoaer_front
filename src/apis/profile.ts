import axios from "axios"
import { getProfileUrl, updateProfileUrl } from "../urls"

export const getProfile = async (token: string) =>{
  const headers = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    }
  }

  return axios.get(getProfileUrl, headers)
}

export const updateProfile = async (token: string, formData: FormData) =>{
  const headers = {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
    }
  }

  return axios.patch(updateProfileUrl, formData, headers)
}