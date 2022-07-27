import { Box } from '@mui/material';
import Spinner from './spinner';

export default function Loading({ backgroundColor, size }) {

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backgroundColor || 'transparent',
      }}
    >
      <Spinner
        size={size||"40px"}
        thickness={3}
      />
    </Box>
  );
}
