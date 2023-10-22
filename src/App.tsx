import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import ROUTERS from '@shared/constants/routers';

import Layout from './pages/Layout';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import ErrorBoundary from './pages/ErrorBoundary';

import styles from './app.module.scss';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path={ROUTERS.BASE}
        element={<Layout />}
        errorElement={<ErrorBoundary />}
      >
        <Route index element={<Home />} />
        <Route path={ROUTERS.ID} element={<MovieDetails />} />
      </Route>
    )
  );

  return (
    <div className={styles.inner}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
