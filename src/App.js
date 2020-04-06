import React, { Component } from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'
import SearchField from './components/SearchField'
import DirectoryTable from './components/DirectoryTable'
import AddUserDialog from './components/AddUserDialog'
import AddUserButton from './components/AddUserButton'

import API from './API'

import sortByName from './utils/sortByName'

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

    const searchedUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchField.toLowerCase())
    )

    return (
      <div>
        <h2>SCHOOL DIRECTORY</h2>
        <SearchField handleSearch={this.handleSearch} />
        {isLoading ? (
          <CircularProgress />
        ) : (
          <DirectoryTable users={searchedUsers} deleteUser={this.deleteUser} />
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

export default App
