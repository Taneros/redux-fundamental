import { createBrowserRouter, Link, Outlet, redirect } from 'react-router-dom';
import { store } from './store';

const loadStore = (): Promise<typeof store> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(store), 0);
  });

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className="container p-5 flex flex-col gap-5">
        <header className="py-5 flex gap-4">
          <Link to="users">Users</Link>
          <Link to="counters">Counters</Link>
        </header>
        <Outlet />
      </div>
    ),
    children: [
      {
        index: true,
        loader: () => redirect('/users'),
      },
      {
        path: 'users',
        lazy: () =>
          import('../modules/users').then((module) => ({
            Component: module.UsersList,
            loader: () => {
              loadStore().then((store) => {
                store.dispatch(module.storeInitialUsersAction());
              });
              return null;
            },
          })),
      },
      {
        path: 'users/:id',
        lazy: () =>
          import('../modules/users').then((module) => ({
            Component: module.UserInfo,
            loader: () => {
              loadStore().then((store) => {
                store.dispatch(module.storeInitialUsersAction());
              });

              return null;
            },
          })),
      },
      {
        path: 'counters',
        lazy: () => import('../modules/counters').then((module) => ({ Component: module.Counters })),
      },
    ],
  },
]);
