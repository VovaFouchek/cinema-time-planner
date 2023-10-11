import { CircularProgress, Container } from '@mui/material';

const Loader = () => (
  <Container
    sx={{
      position: 'absolute',
      textAlign: 'center',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}
  >
    <CircularProgress sx={{ color: '#4d00ff' }} />
  </Container>
);

export default Loader;
