import axios from 'axios';
import { articlesIndexUrl } from '../urls';

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