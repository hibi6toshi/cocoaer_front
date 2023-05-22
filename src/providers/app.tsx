import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Auth0Provider } from '@auth0/auth0-react';
import { RouterProvider } from 'react-router-dom';
import { appRoutes } from '../routes';

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
  return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Auth0Provider
          domain={domain}
          clientId={clientId}
          authorizationParams={{ 
            redirect_uri: window.location.origin,
            audience: audience,
          }}
        >
          <RouterProvider router={appRoutes}></RouterProvider>
        </Auth0Provider>
      </ErrorBoundary>
  );
};