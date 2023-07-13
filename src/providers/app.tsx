import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { AppState, Auth0Provider, User } from '@auth0/auth0-react';
import { RouterProvider } from 'react-router-dom';
import { appRoutes } from '../routes';
import PietyCategoryProvider from './PietyCategoryProvider';
import PietyTargetProvider from './PietyTargetProvider';
import UserProvider from './UserProvider';

const domain: string = process.env.REACT_APP_AUTH0_DOMAIN || ''
const clientId: string = process.env.REACT_APP_AUTH0_CLIENT_ID || ''
const audience: string = process.env.REACT_APP_AUTH0_AUDIENCE || '';

const ErrorFallback = () => {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      {/* <Button className="mt-4" onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </Button> */}
    </div>
  );
};

export const AppProvider = () => {

  const onRedirectCallback = (appState?: AppState, user?: User)  => {
    console.log(appState);
    window.location.href = (appState?.returnTo || window.location.pathname);
  };

  return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PietyCategoryProvider>
          <PietyTargetProvider>
            <UserProvider>
              <Auth0Provider
                domain={domain}
                clientId={clientId}
                authorizationParams={{ 
                  redirect_uri: window.location.origin,
                  audience: audience,
                }}
                onRedirectCallback={onRedirectCallback}
              >
                <RouterProvider router={appRoutes}></RouterProvider>
              </Auth0Provider>
            </UserProvider>
          </PietyTargetProvider>
        </PietyCategoryProvider>
      </ErrorBoundary>
  );
};