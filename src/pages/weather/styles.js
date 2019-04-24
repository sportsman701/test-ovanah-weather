import { fade } from '@material-ui/core/styles/colorManipulator';

export default theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: theme.spacing.unit,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 400,
      },
    },
  },
  noData: {
    fontFamily: 'Candara',
    color: 'lightgray'
  },
  noDataEmoticon: {
    fontSize: '10em',
  },
  contentPane: {
    padding: theme.spacing.unit * 5,
    paddingTop: theme.spacing.unit * 15
  },
  candidatePane: {
    padding: theme.spacing.unit * 5,
    paddingTop: theme.spacing.unit * 5
  },
  media: {
    paddingBottom: theme.spacing.unit * 2
  },
  spinner: {
    position: 'absolute',
    width: '100%',
    paddingTop: '300px'
  },
  date: {
    fontSize: '8em',
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    textShadow: '0 1px 0 #ccc,\
                0 2px 0 #c9c9c9,\
                0 3px 0 #bbb,\
                0 4px 0 #b9b9b9,\
                0 5px 0 #aaa,\
                0 6px 1px rgba(0,0,0,.1),\
                0 0 5px rgba(0,0,0,.1),\
                0 1px 3px rgba(0,0,0,.3),\
                0 3px 5px rgba(0,0,0,.2),\
                0 5px 10px rgba(0,0,0,.25),\
                0 10px 10px rgba(0,0,0,.2),\
                0 20px 20px rgba(0,0,0,.15)'
  },
});