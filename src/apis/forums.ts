import axios from "axios"
import { createForumUrl, deleteForumUrl, editForumUrl, forumsIndexUrl, showForumUrl, updateForumUrl } from "../urls/index"

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

  return axios.get(showForumUrl(forumId), headers)
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
  )
}

export const getEditForum = async (token: string, forumId: string) => {
  const headers = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    }
  }

  return axios.get(editForumUrl(forumId), headers)
}

export const updateForum = async (token: string, forumId: string, formData: FormData) => {
  const headers = {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
    }
  }

  return axios.patch(
    updateForumUrl(forumId),
    formData,
    headers 
  )
}

export const deleteForum = async (token: string, projectId: string) => {
  const headers = {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
    }
  }

  return axios.delete(
    deleteForumUrl(projectId),
    headers 
  )
}