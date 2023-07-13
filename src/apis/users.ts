import axios from 'axios';
import { User } from '@auth0/auth0-react';
import { userCreateUrl } from '../urls';

export const createUser = async(token: string, user: User) => {
  const headers = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    }
  }

  const data = {
    name: user?.name,
    picture: user?.picture
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