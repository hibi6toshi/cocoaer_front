const DEFAULT_API_LOCALHOST = 'http://localhost:3010/api/v1'

export const userCreateUrl = `${DEFAULT_API_LOCALHOST}/users`
// article
export const articlesIndexUrl = `${DEFAULT_API_LOCALHOST}/articles`
export const createArticleUrl = articlesIndexUrl
export const showArticleUrl = (articleId) => `${articlesIndexUrl}/${articleId}`
export const editArticleUrl = (articleId) => `${articlesIndexUrl}/${articleId}/edit`
export const updateArticleUrl = (articleId) => `${articlesIndexUrl}/${articleId}`
export const deleteArticleUrl = (articleId) => `${articlesIndexUrl}/${articleId}`

// project
export const projectsIndexUrl = `${DEFAULT_API_LOCALHOST}/projects`
export const createProjectUrl = projectsIndexUrl
export const showProjectUrl = (projectId) => `${projectsIndexUrl}/${projectId}`
export const editProjectUrl = (projectId) => `${projectsIndexUrl}/${projectId}/edit`
export const updateProjectUrl = (projectId) => `${projectsIndexUrl}/${projectId}`
export const deleteProjectUrl = (projectId) => `${projectsIndexUrl}/${projectId}`

// forum
export const forumsIndexUrl = `${DEFAULT_API_LOCALHOST}/forums`
export const createForumUrl = forumsIndexUrl
export const showForumUrl = (forumId) => `${forumsIndexUrl}/${forumId}`
export const editForumUrl = (forumId) => `${forumsIndexUrl}/${forumId}/edit`
export const updateForumUrl = (forumId)  => `${forumsIndexUrl}/${forumId}`
export const deleteForumUrl = (forumId)  => `${forumsIndexUrl}/${forumId}`

// favorite
export const favoriteIndexUrl = `${DEFAULT_API_LOCALHOST}/favorites`
export const createFavoriteUrl = favoriteIndexUrl
export const deleteFavoriteUrl = (fakeId) =>`${favoriteIndexUrl}/${fakeId}`

// myPost
export const myPostIndexUrl = `${DEFAULT_API_LOCALHOST}/my_post`

export const pietyCategorysIndexUrl = `${DEFAULT_API_LOCALHOST}/piety_categorys`
export const pietyTargetsIndexUrl = `${DEFAULT_API_LOCALHOST}/piety_targets`

