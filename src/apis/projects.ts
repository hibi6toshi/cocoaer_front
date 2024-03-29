import axios from 'axios';
import { createProjectUrl, deleteProjectUrl, editProjectUrl, projectsIndexUrl, updateProjectUrl } from '../urls';

export const getProjects = async ({search}: {search: string}) => {
  return axios.get(`${projectsIndexUrl}${search}`)
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
  // .then(res => {
  //   return res.data
  // })
  // .catch((e: any) => console.error(e))
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

export const getEditProject = async (token: string, projectId: string) =>{
  const headers = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    }
  }

  return axios.get(editProjectUrl(projectId), headers)
}

export const updateProject = async (token: string, projectId: string, formData: FormData) =>{
  const headers = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    }
  }

  return axios.patch(
    updateProjectUrl(projectId),
    formData,
    headers 
  ) 
}

export const deleteProject = async (token: string, projectId: string) => {
  const headers = {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
    }
  }

  return axios.delete(
    deleteProjectUrl(projectId),
    headers 
  )
}