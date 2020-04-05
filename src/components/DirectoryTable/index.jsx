import React, { useState } from 'react'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import MenuButton from '../MenuButton'
import RemoveCircle from '@material-ui/icons/RemoveCircle'
import Edit from '@material-ui/icons/Edit'

import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

const EditDeleteButtons = ({ classes }) => (
  <div className={classes.editDeleteButtons}>
    <Edit fontSize='small' />
    <RemoveCircle fontSize='small' />
  </div>
)

const DirectoryTable = ({ classes, users }) => {
  const [hover, setHover] = useState(null)

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align='left'>{<MenuButton title='Type' />}</TableCell>
            <TableCell align='center'>Sex</TableCell>
            <TableCell align='center'>Email</TableCell>
            <TableCell align='right'>Birthdate</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, idx) => (
            <TableRow
              key={idx}
              onMouseEnter={() => setHover(idx)}
              onMouseLeave={() => setHover(null)}
            >
              <TableCell component='th' scope='row'>
                {user.name}
              </TableCell>
              <TableCell align='left'>{user.type}</TableCell>
              <TableCell align='center'>{user.sex}</TableCell>
              <TableCell align='center'>{user.email}</TableCell>
              <TableCell align='right'>{user.birthdate}</TableCell>
              <TableCell align='right'>
                {hover === idx ? (
                  <EditDeleteButtons classes={classes} />
                ) : (
                  <div style={{ width: 40 }} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default withStyles(styles)(DirectoryTable)
