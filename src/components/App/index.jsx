import React, { Component } from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'
import SearchField from '../SearchField'
import DirectoryTable from '../DirectoryTable'
import AddUserDialog from '../AddUserDialog'
import AddUserButton from '../AddUserButton'

import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

import API from '../../API'

import sortByName from '../../utils/sortByName'

class App extends Component {
  state = {
    isLoading: true,
    users: [],
    searchField: '',
    addUserDialogOpen: false
  }

  // GET USERS
  getUsers = () => {
    API.get('/').then((res) => {
      const userData = res.data.data

      this.setState({
        isLoading: false,
        users: sortByName(userData)
      })
    })
  }

  // ADD USER
  addUser = (data) => {
    this.setState({ isLoading: true })

    API.post('/', data)
      .then((res) => this.getUsers())
      .catch((err) => console.log(err))
  }

  // DELETE USER
  deleteUser = (id) => {
    this.setState({ isLoading: true })

    API.delete(`/${id}`)
      .then((res) => this.getUsers())
      .catch((err) => console.log(err))
  }

  // UPDATE USER
  updateUser = (id, data) => {
    this.setState({ isLoading: true })

    API.put(`/${id}`, data)
      .then((res) => this.getUsers())
      .catch((err) => console.log(err))
  }

  // HANDLE SEARCH BY NAME
  handleSearch = (e) => {
    this.setState({ searchField: e.target.value })
  }

  // TOGGLE ADD USER DIALOG
  toggleAddUserDialog = (bool) => {
    this.setState({ addUserDialogOpen: bool })
  }

  componentDidMount() {
    this.getUsers()
  }

  render() {
    const { isLoading, users, searchField, addUserDialogOpen } = this.state
    const { classes } = this.props

    const searchedUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchField.toLowerCase())
    )

    return (
      <div className={classes.appContainer}>
        <div className={classes.header}>
          <h2>SCHOOL DIRECTORY</h2>
          <SearchField handleSearch={this.handleSearch} />
        </div>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <DirectoryTable
            users={searchedUsers}
            deleteUser={this.deleteUser}
            updateUser={this.updateUser}
          />
        )}
        <AddUserDialog
          open={addUserDialogOpen}
          toggleDialog={this.toggleAddUserDialog}
          addUser={this.addUser}
        />
        <AddUserButton toggleDialog={this.toggleAddUserDialog} />
      </div>
    )
  }
}

export default withStyles(styles)(App)
