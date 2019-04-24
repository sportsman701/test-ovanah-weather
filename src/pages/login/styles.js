const styles = theme => {
  const spacing = theme.spacing.unit * 5
  return {
    root: {
      padding: spacing
    },
    title: {
      margin: spacing
    },
    form: {
      margin: '0 auto'
    },
    control: {
      padding: spacing
    },
    loginButton: {
      marginTop: spacing
    },
    authFailed: {
      marginTop: spacing
    }
  }
}

export default styles