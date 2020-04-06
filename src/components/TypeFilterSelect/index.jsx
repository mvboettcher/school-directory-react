import React from 'react'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

const TypeFilterSelect = ({ classes, typeFilter, handleChange }) => {
  return (
    <FormControl className={classes.typeFormControl}>
      <InputLabel>Filter by Type</InputLabel>
      <Select value={typeFilter} onChange={handleChange}>
        <MenuItem value='All'>All</MenuItem>
        <MenuItem value='student'>Student</MenuItem>
        <MenuItem value='teacher'>Teacher</MenuItem>
        <MenuItem value='administration'>Administration</MenuItem>
      </Select>
    </FormControl>
  )
}

export default withStyles(styles)(TypeFilterSelect)
