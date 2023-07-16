import axios from 'axios';
import { articlesIndexUrl, createArticleUrl, deleteArticleUrl, editArticleUrl, showArticleUrl, updateArticleUrl } from '../urls';

export const getArticles = async () => {
  return axios.get(articlesIndexUrl)
  .then(res => {
    return res.data
  })
  .catch((e: any) => console.error(e))
}

export const getArticle = async (articleId: string) => {
  return axios.get(showArticleUrl(articleId))
  .then(res => {
    return res.data
  })
  .catch((e: any) => console.error(e))
}

export const createArticle = async (token: string, formData: FormData) => {
  const headers = {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
    }
  }

  return axios.post(
    createArticleUrl,
    formData,
    headers 
  ) //.then(res => {
  //   return res.data.data
  // })
  // .catch((e: any) => console.error(e))
}

export const getEditArticle = async (token: string, articleId: string) => {
  const headers = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    }
  }

  return axios.get(editArticleUrl(articleId), headers)
}

export const updateArticle = async (token: string, articleId: string, formData: FormData) => {
  const headers = {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
    }
  }

  return axios.patch(
    updateArticleUrl(articleId),
    formData,
    headers 
  )
}

export const deleteArticle = async (token: string, articleId: string) => {
  const headers = {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
    }
  }

  return axios.delete(
    deleteArticleUrl(articleId),
    headers 
  )
}