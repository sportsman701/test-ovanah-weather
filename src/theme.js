import { createMuiTheme } from '@material-ui/core/styles';
import { blue, indigo, grey } from '@material-ui/core/colors';

export default createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: blue,
    secondary: indigo,
    light: grey,
    background: {
      default: '#fff'
    }
  },
  overrides: {
    MuiIconButton: {
      root: {
        '&:focus': {
          outline: 'none'
        }
      }
    }
  }
});
