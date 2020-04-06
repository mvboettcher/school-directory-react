import React, { useState } from 'react'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'

import RemoveCircle from '@material-ui/icons/RemoveCircle'
import Edit from '@material-ui/icons/Edit'

import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

const EditDeleteButtons = ({ classes, deleteUser, id }) => (
  <div className={classes.editDeleteContainer}>
    <Edit fontSize='small' className={classes.editDeleteButton} />
    <RemoveCircle
      fontSize='small'
      className={classes.editDeleteButton}
      onClick={() => deleteUser(id)}
    />
  </div>
)

const DirectoryTable = ({ classes, users, deleteUser }) => {
  const [hover, setHover] = useState(null)

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align='left'>Type</TableCell>
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
                  <EditDeleteButtons
                    id={user._id}
                    classes={classes}
                    deleteUser={deleteUser}
                  />
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
