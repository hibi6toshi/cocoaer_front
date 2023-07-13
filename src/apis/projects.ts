import axios from 'axios';
import { createProjectUrl, projectsIndexUrl } from '../urls';

export const getProjects = async () => {
  return axios.get(projectsIndexUrl)
  .then(res => {
    return res.data
  })
  .catch((e: any) => console.error(e))
}

export const getProject = async (token: string, projectId: string) =>{
  const headers = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    }
  }

  return axios.get(`${projectsIndexUrl}/${projectId}`, headers)
  .then(res => {
    return res.data
  })
  .catch((e: any) => console.error(e))
}

export const createProject = async (token: string, formData: FormData) =>{
  const headers = {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
    }
  }

  return axios.post(
    createProjectUrl,
    formData,
    headers 
  ) 
}