import { ErrorBoundary } from "react-error-boundary";
import {
  createBrowserRouter,
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
import { default as ArticleNewPage } from "../pages/articles/New";
import { default as ArticleEditPage } from "../pages/articles/Edit";
import {
  default as ProjectIndexPage,
  loader as ProjectsIndexLoader
} from "../pages/projects/Index"
import { default as ProjectNewPage } from "../pages/projects/New"
import { default as ProjectShowPage } from "../pages/projects/Show"
import { default as ProjectEditPage } from "../pages/projects/Edit"
import {
  default as ForumsIndexPage,
  loader as ForumsIndexLoader,
} from "../pages/forums/Index"
import { default as ForumNewPage} from "../pages/forums/New";
import { default as ForumShowPage } from "../pages/forums/Show";
import { default as ForumEditPage } from "../pages/forums/Edit";
import { default as FavoriteIndex } from "../pages/favorites/Index"
import { default as FavotiteShow } from "../pages/favorites/Show"
import { default as MyPostIndex } from "../pages/myposts/Index"
import { default as MyPostShow } from "../pages/myposts/Show"
import { default as UserIndex } from "../pages/users/Index"
import { default as UserShow } from "../pages/users/Show"
import { default as ProfileShow } from "../pages/profiles/Show"
import { default as PrivacyPolicy } from "../pages/layouts/staticPages/PrivacyPolicy"
import { default as TermsOfService } from "../pages/layouts/staticPages/TermsOfService"
import { AuthenticationGuard } from "../components/Auth0s/AuthenticationGuard";
import AuthenticationGuardWithOutlet from "../components/Auth0s/AuthenticationGuardWithOutlet";
import { redirect } from "react-router-dom";

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
      },
      {
        path: "privacypolicy",
        element: <PrivacyPolicy />
      },
      {
        path: "TermsOfService",
        element: <TermsOfService />
      },
      {
        path: "articles",
        element: <ArticleIndexPage />,
        loader: ArticleIndexLoader,
      },
      {
        path: "articles/:articleId",
        element: <ArticleShowPage />,
        // element: <AuthenticationGuard component={ArticleShowPage} />,
        loader: ArticleShowLoader,
      },
      {
        path: "articles/new",
        element: <AuthenticationGuard component={ArticleNewPage} />
      },
      {
        path: "articles/:articleId/edit",
        element: <AuthenticationGuard component={ArticleEditPage} />,
      },
      {
        path: "articles/:artilceId/destroy",
      },
      {
        path: "projects",
        element: <ProjectIndexPage />,
        loader: ProjectsIndexLoader,
      },
      {
        path: "projects/new",
        element: <AuthenticationGuard component={ProjectNewPage} />,
      },
      {
        path: "projects/:projectId",
        element: <AuthenticationGuard component={ProjectShowPage} />,
      },
      {
        path: "projects/:projectId/edit",
        element: <AuthenticationGuard component={ProjectEditPage} />,
      },
      {
        path: "forums",
        element: <ForumsIndexPage />,
        loader: ForumsIndexLoader,
      },
      {
        path: "forums/:forumId",
        element: <AuthenticationGuard component={ForumShowPage} />,
      },
      {
        path: "forums/:forumId/edit",
        element: <AuthenticationGuard component={ForumEditPage} />,
      },
      {
        path: "forums/new",
        element: <AuthenticationGuard component={ForumNewPage} />
      },
      {
       path: '',
       element: <AuthenticationGuardWithOutlet />,
        // 以下のpathではLoader/Actionは使わない（useAuth0フックを使う必要があるため、各ReactComponent内で済ます。）
       children: [
        {
          path: "myposts",
          element: <MyPostIndex />,
          children: [
            {
              index: true,
              element: <div>mypost_index</div>,
              loader: () => {return redirect("articles")},
            },
            {
              path: "articles",
              element: <MyPostShow contentType="Article" />
            },
            {
              path: "projects",
              element: <MyPostShow contentType="Project" />
            },
            {
              path: "forums",
              element: <MyPostShow contentType="Forum" />
            },
          ]
        },
        {
          path: "favorites",
          element: <FavoriteIndex />,
          children: [
            {
              index: true,
              element: <div>favorite_index</div>,
              loader: () => {return redirect("articles")},
            },
            {
              path: "articles",
              element: <FavotiteShow favoritableType="Article" />
            },
            {
              path: "projects",
              element: <FavotiteShow favoritableType="Project" />
            },
            {
              path: "forums",
              element: <FavotiteShow favoritableType="Forum" />
            },
          ]
        },
        {
          path: "users/:userId",
          element: <UserIndex />,
          children: [
            {
              index: true,
              element: <div>user_index</div>,
              loader: () => {return redirect("articles")},
            },
            {
              path: "articles",
              element: <UserShow contentType="Article"/>
            },
            {
              path: "projects",
              element: <UserShow contentType="Project"/>
            },
            {
              path: "forums",
              element: <UserShow contentType="Forum"/>
            },
          ]
        },
        {
          path: "profile",
          element: <ProfileShow />,
        },
       ]
      },
    ]
  },
]);

// TODO: ErrorBoundary かerrorelementのコンポーネント作成