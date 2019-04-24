import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import { authSelector } from '../../redux/modules/auth/selectors'
import { tryAuth } from '../../redux/modules/auth/actions'
import styles from './styles';


class Login extends Component {
  static propTypes = {
  };

  constructor(props) {
    super(props)
    this.state = {
      showFailed: false
    }
  }

  handleAuthFailed = () => {
    this.setState({
      showFailed: true
    })
  }

  handlePasswordInput = e => {
    this.password = e.target.value
    this.setState({ showFailed: false })
    e.which === 13 && this.handleLoginClick()
  }

  handleLoginClick = () => this.props.tryAuth({
    authFailCallback: this.handleAuthFailed,
    password: this.password
  })

  render() {
    const { classes, auth } = this.props
    const { showFailed } = this.state

    if (auth) {
      return <Redirect to='/' />
    }

    return (
      <Grid container spacing={16} className={classes.root}>
        <Grid item xs={12} md={8} lg={6} className={classes.form}>
          <Typography variant="h4" className={classes.title}>Weather Forecast</Typography>
          <Paper className={classes.control}>
            <TextField
              label="Password"
              type="password"
              onKeyDown={this.handlePasswordInput}
            />
            <br/>
            <Button
              className={classes.loginButton}
              onClick={this.handleLoginClick}
              variant="contained"
              color="primary"
            >
              Login
            </Button>
            {showFailed && <Typography color='primary' className={classes.authFailed}>Authentication failed</Typography>}
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

const selector = createStructuredSelector({
  auth: authSelector,
});

const actions = {
  tryAuth
}

export default compose(
  connect(selector, actions),
  withStyles(styles)
)(Login);