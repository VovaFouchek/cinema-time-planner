import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';

import Button from '@components/Button';
import ROUTERS from '@shared/constants/routers';

import styles from './errorBoundary.module.scss';

const ErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className={styles.wrap}>
        <h1>{error.status} error</h1>
        <p className={styles.description}>{error.data}</p>
        <Link to={ROUTERS.BASE} relative="path">
          <Button>Back to home</Button>
        </Link>
      </div>
    );
  }

  return null;
};

export default ErrorBoundary;
