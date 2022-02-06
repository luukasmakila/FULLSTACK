import React from 'react'

const User = ({ user, blogs }) => {
  return (
    <div>
      <p>{user.name} {blogs.length}</p>
    </div>
  )
}

export default User
