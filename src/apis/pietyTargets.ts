import axios from "axios";
import { pietyTargetsIndexUrl } from "../urls";

export const getPietyTargets = async () => {
  return axios.get(pietyTargetsIndexUrl)
  .then(res => {
    return res.data.data;
  })
  .catch((e: any) => {console.error(e)})
}

