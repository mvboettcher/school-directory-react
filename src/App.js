import React, { Component } from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'
import SearchField from './components/SearchField'
import DirectoryTable from './components/DirectoryTable'
import AddUserButton from './components/AddUserButton'

import sortByName from './utils/sortByName'

import API from './API'

class App extends Component {
  state = {
    isLoading: true,
    users: [],
    searchField: ''
  }

  getUsers = async () => {
    let userData = await API.get('/')
    userData = userData.data.data

    console.log(userData)
    this.setState({
      isLoading: false,
      users: sortByName(userData)
    })
  }

  deleteUser = (id) => {
    this.setState({ isLoading: true })

    API.delete(`/${id}`)
      .then((res) => this.getUsers())
      .catch((err) => console.log(err))
  }

  handleSearch = (e) => {
    this.setState({ searchField: e.target.value })
  }

  componentDidMount() {
    this.getUsers()
  }

  render() {
    const { isLoading, users, searchField } = this.state

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
        <AddUserButton />
      </div>
    )
  }
}

export default App
