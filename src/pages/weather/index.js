import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import { PulseLoader } from 'react-spinners';

import cx from 'classnames';
import { authSelector } from '../../redux/modules/auth/selectors'
import {
  loadingSelector,
  weatherSelector,
  locationSelector
} from '../../redux/modules/weather/selectors'
import { searchRequest, weatherRequest } from '../../redux/modules/weather/actions'
import styles from './styles';
import '../../App.css';


class Weather extends Component {
  constructor(props) {
    super(props)
    this.SEARCH_RESULT = {
      MANY_CITY: 0,
      NO_CITY: 1
    }
    this.state = {
      searchResult: undefined
    }
  }
  
  componentDidMount() {
    this.props.searchRequest({ search: undefined })
  }

  handleSearchNoCity = () => this.setState({ searchResult: this.SEARCH_RESULT.NO_CITY})

  handleSearchManyCity = candidates => this.setState({ searchResult: this.SEARCH_RESULT.MANY_CITY, candidates })

  handleCandidateClick = woeid => () => this.props.weatherRequest({ woeid })

  handleHomeClick = () => this.props.searchRequest({ search: undefined })

  handleSearchClick = () => this.props.searchRequest({
    search: this.search,
    noCityCallback: this.handleSearchNoCity,
    manyCityCallback: this.handleSearchManyCity
  })

  handleSearchInput = e => {
    this.search = e.target.value
    if (e.which === 13) {
      this.handleSearchClick()
    }
  }

  render() {
    const { classes, auth, loading, weather, location } = this.props
    const { searchResult, candidates } = this.state

    if (!auth) {
      return <Redirect to='/login'/>
    }

    return (
      <div className={classes.root}>
        <div className={classes.spinner}>
          <PulseLoader
            sizeUnit={"px"}
            size={20}
            color={'#2196f3'}
            loading={!!loading}
          />
        </div>
        <AppBar position="fixed">
          <Toolbar>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              {loading ? 'Loading'
              : location ? location
              : searchResult === this.SEARCH_RESULT.MANY_CITY
              ? 'Candidates'
              : 'Weather Forecast' }
            </Typography>
            <div className={classes.grow} />
            <div className={classes.search}>
              <InputBase
                placeholder="Search"
                onKeyUp={this.handleSearchInput}
                disabled={!!loading}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <div>
              <IconButton
                color="inherit"
                disabled={!!loading}
                onClick={this.handleSearchClick}
              >
                <SearchIcon />
              </IconButton>
              <IconButton
                color="inherit"
                disabled={!!loading}
                onClick={this.handleHomeClick}
              >
                <HomeIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <Paper className={classes.contentPane}>
        { location ? (
          <Grid container className={classes.cardContainer} spacing={24}>
          { weather.map(val => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={val.id}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={"https://www.metaweather.com/static/img/weather/" + val.weather_state_abbr + ".svg"}
                  />
                  <CardContent>
                    <div className={classes.date}>{val.applicable_date.substring(8)}</div>
                    <div>
                      <Typography gutterBottom variant="h5" component="h2">
                        {val.weather_state_name}
                      </Typography>
                      <Typography component="p">
                        Air Pressure {Math.round(val.air_pressure)}
                      </Typography>
                      <Typography component="p">
                        Humidity {val.humidity}
                      </Typography>
                      <Typography component="p">
                        Max Temp {Math.round(val.max_temp)}
                      </Typography>
                      <Typography component="p">
                        Min Temp {Math.round(val.min_temp)}
                      </Typography>
                      <Typography component="p">
                        Wind Direction {val.wind_direction_compass}
                      </Typography>
                      <Typography component="p">
                        Wind Speed {Math.round(val.wind_speed * 100) / 100}
                      </Typography>
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
          </Grid>
          ) : searchResult === this.SEARCH_RESULT.MANY_CITY ? (
            <List className={classes.candidatePane} disabled={!!loading}>
              {candidates.map(({ woeid, title }, key) => (
                <ListItem button key={key}>
                  <ListItemText
                    primary={title}
                    onClick={this.handleCandidateClick(woeid)}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <>
              <Typography className={cx(classes.noData, classes.noDataEmoticon)}>: (</Typography>
              <Typography variant={'h4'} className={classes.noData}>No matching location</Typography>
            </>
          )}
        </Paper>
      </div>
    );
  }
}

const selector = createStructuredSelector({
  auth: authSelector,
  loading: loadingSelector,
  weather: weatherSelector,
  location: locationSelector
});

const actions = {
  searchRequest,
  weatherRequest
}

export default compose(
  connect(selector, actions),
  withStyles(styles)
)(Weather);
