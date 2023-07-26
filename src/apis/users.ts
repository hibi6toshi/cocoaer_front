import axios from 'axios';
import { User } from '@auth0/auth0-react';
import { showUserUrl, userArticlesIndexUrl, userCreateUrl, userForumsIndexUrl, userProjectsIndexUrl } from '../urls';

export const createUser = async(token: string, user: User) => {
  const headers = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    }
  }

  const data = {
    name: user?.nickname,
  }
  return axios.post(
    userCreateUrl,
    data,
    headers 
  ).then(res => {
    return res.data.data
  })
  .catch((e: any) => console.error(e))
}

export const getUser = async (token: string, userId: string) =>{
  const headers = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    }
  }

  return axios.get(showUserUrl(userId), headers)
}

export const getUserArticles =async (token: string, userId: string) => {
  const headers = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    }
  }

  return axios.get(userArticlesIndexUrl(userId), headers)
}

export const getUserProjects =async (token: string, userId: string) => {
  const headers = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    }
  }

  return axios.get(userProjectsIndexUrl(userId), headers)
}

export const getUserForums =async (token: string, userId: string) => {
  const headers = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    }
  }

  return axios.get(userForumsIndexUrl(userId), headers)
}