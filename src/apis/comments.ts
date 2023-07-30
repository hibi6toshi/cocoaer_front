import axios from 'axios';
import { commentIndexUrl, createCommentUrl, deleteCommentUrl, updateCommentUrl } from '../urls';

export const getComments = async (CommentableType: string, commentableId: string) => {
  return axios.get(commentIndexUrl(CommentableType.toLowerCase(), commentableId))
  .then(res => {
    return res.data
  })
  .catch((e: any) => console.error(e))
}

export const createComment = async (token: string, CommentableType: string, commentableId: string, formData: FormData) => {
  const headers = {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
    }
  }

  return axios.post(
    createCommentUrl(CommentableType.toLowerCase(), commentableId),
    formData,
    headers 
  )
}

export const updateComment = async (token: string, CommentableType: string, commentableId: string, commentId: string, formData: FormData) => {
  const headers = {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
    }
  }

  return axios.patch(
    updateCommentUrl(CommentableType.toLowerCase(), commentableId, commentId),
    formData,
    headers 
  )
}

export const deleteComment = async (token: string, CommentableType: string, commentableId: string, commentId: string) => {
  const headers = {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
    }
  }

  return axios.delete(
    deleteCommentUrl(CommentableType.toLowerCase(), commentableId, commentId),
    headers 
  )
}