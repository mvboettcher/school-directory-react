import React, { Component } from 'react'

import SearchField from './components/SearchField'
import DirectoryTable from './components/DirectoryTable'
import AddUserButton from './components/AddUserButton'

import API from './API'

class App extends Component {
  state = {
    isLoading: true,
    users: []
  }

  async componentDidMount() {
    let userData = await API.get('/')

    userData = userData.data.data

    this.setState({
      isLoading: false,
      users: userData
    })
  }

  render() {
    const { isLoading, users } = this.state
    return (
      <div
        style={{
          height: '100%',
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <h2>SCHOOL DIRECTORY</h2>
        <SearchField />
        {isLoading ? <h3>Loading...</h3> : <DirectoryTable users={users} />}
        <AddUserButton />
      </div>
    )
  }
}

export default App
