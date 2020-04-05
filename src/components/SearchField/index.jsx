import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Search from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}))

export default function SearchField() {
  const classes = useStyles()

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
          ),
        }}
      />
    </div>
  )
}
