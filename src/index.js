import React, { useState } from 'react'
import { render } from 'react-dom'
import { Provider, useDispatch, useSelector } from 'react-redux'

import store, { actions, selectors } from './store'

const App = () => {
  const [newUserName, setNewUserName] = useState('')
  const dispatch = useDispatch()
  // A selector automatically created by createEntityAdapter
  const allUsers = useSelector(selectors.selectAll)

  const handleFormSubmit = e => {
    e.preventDefault()
    dispatch(
      actions.usersAddOne({
        id: String(Math.random()),
        name: newUserName,
        image: 'https://placeimg.com/48/48/people',
      }),
    )
    setNewUserName('')
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          style={{ display: 'inline' }}
          type="text"
          value={newUserName}
          onChange={e => setNewUserName(e.target.value)}
        />
        <input style={{ display: 'inline' }} type="submit" value="Create" />
      </form>
      <h1>Users:</h1>
      <div>
        {allUsers.map(user => (
          <div
            key={user.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
            }}
          >
            <img src={user.image} />
            <div style={{ flex: '1', margin: '0 10px' }}>{user.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
