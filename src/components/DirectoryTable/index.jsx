import React, { useState } from 'react'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import RemoveCircle from '@material-ui/icons/RemoveCircle'
import Edit from '@material-ui/icons/Edit'

import UpdateUserDialog from '../UpdateUserDialog'

import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter'

const DirectoryTable = ({ classes, users, deleteUser, updateUser }) => {
  const [hover, setHover] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const openDialog = () => setDialogOpen(true)
  const closeDialog = () => setDialogOpen(false)

  return (
    <div>
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
                <TableCell align='left'>
                  {capitalizeFirstLetter(user.type)}
                </TableCell>
                <TableCell align='center'>
                  {capitalizeFirstLetter(user.sex)}
                </TableCell>
                <TableCell align='center'>{user.email}</TableCell>
                <TableCell align='right'>{user.birthdate}</TableCell>
                <TableCell align='right'>
                  {hover === idx ? (
                    <div className={classes.editDeleteContainer}>
                      <Edit
                        fontSize='small'
                        className={classes.editDeleteButton}
                        onClick={openDialog}
                      />
                      <RemoveCircle
                        fontSize='small'
                        className={classes.editDeleteButton}
                        onClick={() => deleteUser(user._id)}
                      />
                      <UpdateUserDialog
                        open={dialogOpen}
                        closeDialog={closeDialog}
                        user={user}
                        updateUser={updateUser}
                      />
                    </div>
                  ) : (
                    <div style={{ width: 40 }} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default withStyles(styles)(DirectoryTable)
