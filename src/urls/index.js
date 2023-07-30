const DEFAULT_API_LOCALHOST = 'http://localhost:3010/api/v1'

// users
export const userCreateUrl = `${DEFAULT_API_LOCALHOST}/users`
export const showUserUrl = (userId) => `${userCreateUrl}/${userId}`
export const userArticlesIndexUrl = (userId) => `${userCreateUrl}/${userId}/articles`
export const userProjectsIndexUrl = (userId) => `${userCreateUrl}/${userId}/projects`
export const userForumsIndexUrl = (userId) => `${userCreateUrl}/${userId}/forums`

// profile
export const getProfileUrl = `${DEFAULT_API_LOCALHOST}/profile`
export const updateProfileUrl = getProfileUrl;

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

// comment
export const commentIndexUrl = (commentableType, commentableId) => `${DEFAULT_API_LOCALHOST}/${commentableType}s/${commentableId}/comments`
export const createCommentUrl = (commentableType, commentableId) => commentIndexUrl(commentableType, commentableId)
export const updateCommentUrl = (commentableType, commentableId, commentId) => `${commentIndexUrl(commentableType, commentableId)}/${commentId}`
export const deleteCommentUrl = (commentableType, commentableId, commentId) => `${commentIndexUrl(commentableType, commentableId)}/${commentId}`

// myPost
export const myPostIndexUrl = `${DEFAULT_API_LOCALHOST}/my_post`

export const pietyCategorysIndexUrl = `${DEFAULT_API_LOCALHOST}/piety_categorys`
export const pietyTargetsIndexUrl = `${DEFAULT_API_LOCALHOST}/piety_targets`

