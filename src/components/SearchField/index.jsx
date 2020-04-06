import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Search from '@material-ui/icons/Search'

import styles from './styles'

const SearchField = ({ classes, handleSearch }) => {
  return (
    <div>
      <TextField
        variant='outlined'
        className={classes.margin}
        id='input-with-icon-textfield'
        label='Search by Name'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Search />
            </InputAdornment>
          )
        }}
        onChange={handleSearch}
      />
    </div>
  )
}

export default withStyles(styles)(SearchField)
