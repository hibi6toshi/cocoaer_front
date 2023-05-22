import { ErrorBoundary } from "react-error-boundary";
import {
  createBrowserRouter,
  Outlet,
} from "react-router-dom";
import Layout from "../pages/layouts/Layout";
import IndexPage from "../pages/layouts/staticPages/IndexPage";
import { 
  default as ArticleIndexPage,
  loader as ArticleIndexLoader
} from "../pages/articles/Index";
import {
  default as ArticleShowPage,
  loader as ArticleShowLoader
} from "../pages/articles/Show"
import {
  default as ProjectIndexPage,
  loader as ProjectsIndexLoader
} from "../pages/projects/Index"
import {
  default as ForumsIndexPage,
  loader as ForumsIndexLoader,
} from "../pages/forums/Index"

export const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>Ooooooops</div>,
    loader: (): string=>{
      console.log("rootloader");
      return 'xxx';
    },
    children: [
      {
        index: true, 
        element: <IndexPage />,
        loader: (): string =>{
          console.log("root_loader_action_hear");
          return "action_result(articles)"
        },
        action: (): string => {
          console.log("root_action_action_hear(create_article)");
          return "Responce_redirect"
        },
      },
      {
        path: "articles",
        element: <ArticleIndexPage />,
        loader: ArticleIndexLoader,
        action: (): string => {
          console.log("articles_action_hear(create_article)");
          return "Responce_redirect"
        },
      },
      {
        path: "articles/:articleId",
        element: <ArticleShowPage />,
        loader: ArticleShowLoader,
        action: (): string => {
          console.log("articles/:artilceId_action_action_hear(edit_article)");
          return "Responce_redirect"
        },
      },
      {
        path: "articles/:artilceId/edit",
        element: <div>article edit</div>,
        loader: (): string =>{
          console.log("articles/:artilceId/edit_loader_action_hear");
          return "action_result(articles/:artilceId/edit)"
        },
        action: (): string => {
          console.log("articles/:artilceId/edit_action_action_hear(edit_article)");
          return "Responce_redirect"
        },
      },
      {
        path: "articles/:artilceId/destroy",
        action: (): string => {
          console.log("articles/:artilceId/destroy_action_action_hear(destroy_article)");
          return "Responce_redirect"
        },
      },
      {
        path: "projects",
        element: <ProjectIndexPage />,
        loader: ProjectsIndexLoader,
      },
      {
        path: "forums",
        element: <ForumsIndexPage />,
        loader: ForumsIndexLoader,
      },
      {
        path: "favorites",
        element: <div>favorites<Outlet /></div>,
        loader: (): string=>{
          console.log("favoriteloader");
          return 'xxx';
        },
        children: [
          {
            index: true,
            element: <div>favorite_index</div>,
            loader: (): string=>{
              console.log("favorite_indexloader");
              return 'xxx';
            },
          },
          {
            path: "projects",
            element: <div>favorites_project</div>
          }
        ]
      },
      {
        path: "myposts",
        element: <div>myposts</div>,
        loader: (): string=>{
          console.log("myposts");
          return 'xxx';
        },
      },
      {
        path: "profile",
        element: <div>profile</div>,
        loader: (): string=>{
          console.log("myposts");
          return 'xxx';
        },
      },
    ]
  },
]);

// ErrorBoundary かerrorelementのコンポーネント作成