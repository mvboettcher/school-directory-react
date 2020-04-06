import React from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

const AddUserButton = ({ classes, toggleDialog }) => {
  const openDialog = () => toggleDialog(true)
  return (
    <Fab className={classes.fab} color='primary' onClick={openDialog}>
      <AddIcon />
    </Fab>
  )
}

export default withStyles(styles)(AddUserButton)
