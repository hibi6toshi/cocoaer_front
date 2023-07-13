import axios from 'axios';
import { pietyCategorysIndexUrl } from '../urls';

export const getPietyCategorys = async () => {
  return axios.get(pietyCategorysIndexUrl)
  .then(res => {
    return res.data.data
  })
  .catch((e: any) => console.error(e))
}