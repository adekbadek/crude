import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { Provider, useDispatch, useSelector } from 'react-redux'

import store, { actions, selectors } from './store'

const App = () => {
  const [newUserName, setNewUserName] = useState('')
  const dispatch = useDispatch()
  // A selector automatically created by createEntityAdapter
  const allUsers = useSelector(selectors.selectAll)

  useEffect(() => {
    fetch(`https://randomuser.me/api/?results=10`)
      .then(res => res.json())
      .then(({ results }) => {
        const users = results.map(user => ({
          id: user.login.uuid,
          name: `${user.name.first} ${user.name.last}`,
          image: user.picture.thumbnail,
        }))
        dispatch(actions.usersAddMany(users))
      })
  }, [])

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
            <input
              style={{ flex: '1', margin: '0 10px' }}
              value={user.name}
              onChange={e => {
                dispatch(
                  actions.userUpdate({
                    id: user.id,
                    changes: { name: e.target.value },
                  }),
                )
              }}
            />
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
