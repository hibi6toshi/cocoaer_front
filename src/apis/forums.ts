import axios from "axios"
import { forumsIndexUrl } from "../urls/index"

export const getForums = async () =>  {
  return axios.get(forumsIndexUrl)
  .then(res => {
    return res.data
  })
  .catch((e: any) => console.error(e))
}
