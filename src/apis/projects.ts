import axios from 'axios';
import { projectsIndexUrl } from '../urls';

export const getProjects = async () => {
  return axios.get(projectsIndexUrl)
  .then(res => {
    return res.data
  })
  .catch((e: any) => console.error(e))
}