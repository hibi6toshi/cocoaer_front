import axios from "axios"
import { createFavoriteUrl, deleteFavoriteUrl, favoriteIndexUrl } from "../urls"
import { FavoritableType } from "../types"

export const getFavorites = async (token: string, favoritableType: FavoritableType) => {
  const headers = {
      Authorization: token,
  }

  const params = {
    favoritable_type: favoritableType,
  }

  return axios.get( 
    favoriteIndexUrl,
    {
      params,
      headers
    }
  ).then(res => {
    return res
  })
  .catch((e: any) => console.error(e))
} 

export const createFavorite = async (token: string, favoritableType:string ,favoritableId: string) => {
  const headers = {
    headers: {
      Authorization: token,
    }
  }

  const params = {
    favoritable_type: favoritableType,
    favoritable_id: favoritableId
  }

  return axios.post(
    createFavoriteUrl,
    params,
    headers 
  )
}

export const deleteFavorite = async (token: string, favoritableType:string ,favoritableId: string) => {
  const headers = {
      Authorization: token,
  }

  const params = {
    favoritable_type: favoritableType,
    favoritable_id: favoritableId
  }

  return axios.delete(
    deleteFavoriteUrl("fake"),
    {
      headers,
      params
    } 
  )
}