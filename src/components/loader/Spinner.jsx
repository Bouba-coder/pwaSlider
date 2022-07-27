import { Box } from '@mui/material';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';


export default function Spinner({
    size= '40px',
    thickness= 4,
    color="#1c3252",
    spinnerContainerStyle={},
    backgroundColor="#66d7eb",
}) {

  const containerStyle = {
    ...spinnerContainerStyle,
    position: 'relative',
  };

  return (
    <Box sx={containerStyle}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: backgroundColor
        }}
        size={size}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: color ,
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={size}
        thickness={thickness}
      />
    </Box>
  );
}

