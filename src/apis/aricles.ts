import axios from 'axios';
import { articlesIndexUrl, createArticleUrl } from '../urls';

export const getArticles = async () => {
  return axios.get(articlesIndexUrl)
  .then(res => {
    return res.data
  })
  .catch((e: any) => console.error(e))
}

export const getArticle = async (articleId: string) => {
  return axios.get(`${articlesIndexUrl}/${articleId}`)
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