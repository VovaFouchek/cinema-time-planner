import { Alert, AlertTitle } from '@mui/material';

const alertStyles = {
  position: 'absolute',
  bottom: '20px',
  left: '20px',
  backgroundColor: '#ffb8b8',
};

const ErrorMessage = ({ message = 'missing' }) => {
  return (
    <Alert severity="error" sx={alertStyles}>
      <AlertTitle>Error. Try again</AlertTitle>
      Details: <strong>{message}</strong>
    </Alert>
  );
};

export default ErrorMessage;
